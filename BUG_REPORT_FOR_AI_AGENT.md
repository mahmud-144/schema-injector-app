# 🐛 AI AGENT এর জন্য BUG REPORT

**Status:** CRITICAL 🔴  
**সমস্যা:** User যখন "Save Schema" বাটন ক্লিক করে, তখন data database এ save হয় কিন্তু frontend UI এ দেখা যায় না  
**প্রভাব:** User confuse হয় - মনে হয় data save হয়নি, অথচ data আসলে save আছে  

---

## 📋 সমস্যার বর্ণনা

### যা ঘটছে:
1. User একটি schema group তৈরি করে (নাম: "Test Group")
2. Schema type নির্বাচন করে (যেমন: Local Business)
3. Form এ data fill করে:
   - Business Name: "My Shop"
   - URL: "https://example.com"
   - Description: "My description"
4. **"Save Schema" বাটন ক্লিক করে**
5. ✅ Database এ data save হয়
6. ❌ **কিন্তু Frontend এ কিছুই হয় না** - form ফাঁকা থাকে বা পুরনো data দেখায়
7. Page refresh করলে তবেই data দেখা যায়
8. যখন পরে সেই group edit করতে যায়, তখন পুরনো data দেখা যায় (confirm হয় data save আছে)

### যা হওয়া উচিত:
- "Save Schema" ক্লিক করলে **তৎক্ষণাৎ** saved data UI তে দেখা যাবে
- কোনো page refresh এর প্রয়োজন নেই
- User feedback দেখবে যে "Schema saved successfully!"

### কিন্তু যা হচ্ছে:
- "Save Schema" ক্লিক করার পরেও UI এ কোনো পরিবর্তন নেই
- Saved data দেখা যায় না
- Page refresh করলে তবেই দেখা যায়

---

## 🔍 BUG এর অবস্থান

### File: `app/routes/app._index.jsx`

---

## ✅ যা ঠিক আছে (Backend):

**Lines 178-194** এ backend action handler:

```javascript
if (actionType === "saveGroup") {
  // ... code ...
  const updatedGroup = await getGroup(session.shop, group.slug);
  await writeSchemaMetafields(admin, session.shop, updatedGroup);
  
  return { group: updatedGroup, message: "Schema saved successfully!" };
}
```

**Backend ঠিকমতো কাজ করছে:**
- Database এ data save হচ্ছে ✅
- Updated group data fetch করছে ✅
- Schemas array সহ return করছে ✅

---

## 🔴 যা ভুল আছে (Frontend):

**Lines 534-560** এর useEffect এ BUG:

```javascript
useEffect(() => {
  if (fetcher.data?.group) {
    setActiveGroup(fetcher.data.group);  // ← এটা ঠিক আছে
    setNotice(fetcher.data.message || "Group loaded");
    shopify.toast.show(fetcher.data.message || "Group loaded");
    setTimeout(() => setNotice(""), 3000);
    
    // 🔴 এখানেই BUG আছে!
    // Backend থেকে schemas এসেছে কিন্তু সেগুলো parse করে
    // addedSchemas state এ রাখা হচ্ছে না!
    // Result: UI update হয় না, schemas দেখা যায় না
  }
  // ... more code
}, [fetcher.data, shopify, injectTarget]);
```

**সমস্যা:**
- `fetcher.data?.group` receive হচ্ছে ✅
- কিন্তু সেই group এর schemas কে parse করা হচ্ছে না ❌
- `setAddedSchemas()` কখনো call হচ্ছে না ❌
- Result: UI component re-render হচ্ছে না ❌

---

## ✅ এডিট mode এ কেন কাজ করে:

**Lines 463-504** এ edit mode এর useEffect:

```javascript
useEffect(() => {
  if (loaderData?.editGroup) {
    const group = loaderData.editGroup;
    setActiveGroup(group);
    
    // ✅ এখানে schemas কে properly parse করা হচ্ছে
    if (group.schemas && group.schemas.length > 0) {
      const parsedSchemas = group.schemas.map((s) => {
        let data = {};
        // ... parsing logic ...
        return {
          id: s.id,
          type: s.type,
          label: s.name,  // name কে label এ convert করছে
          mode: s.mode || "form",
          data,
        };
      });
      setAddedSchemas(parsedSchemas);  // ✅ State update হচ্ছে
    }
  }
}, [loaderData, shopify]);
```

**কেন কাজ করছে:**
- Schemas কে parse করা হচ্ছে ✅
- `setAddedSchemas()` call হচ্ছে ✅
- UI update হচ্ছে ✅

---

## 🔧 ফিক্স কী করতে হবে:

### সমাধান: Lines 534-560 এর useEffect এ এই code যোগ করো:

**সংক্ষিপ্ত ব্যাখ্যা:**
- Lines 463-504 এর same parsing logic নিয়ে এসো
- Lines 534-560 এর useEffect এ paste করো
- এটা নিশ্চিত করবে যে save করার পরেও schemas parse হবে এবং UI update হবে

**Code যোগ করার জায়গা:**
```javascript
if (fetcher.data?.group) {
  setActiveGroup(fetcher.data.group);
  setNotice(fetcher.data.message || "Group loaded");
  shopify.toast.show(fetcher.data.message || "Group loaded");
  setTimeout(() => setNotice(""), 3000);
  
  // 🔧 এই block যোগ করো:
  if (fetcher.data.group.schemas && fetcher.data.group.schemas.length > 0) {
    const parsedSchemas = fetcher.data.group.schemas.map((s) => {
      let data = {};
      try {
        if (s.formData) {
          data = JSON.parse(s.formData);
        } else if (s.jsonContent) {
          data = { json: s.jsonContent };
        }
      } catch {
        data = {};
      }

      // FAQ এর জন্য special handling
      if (s.type.toLowerCase() === "faq_page" && s.faqRows) {
        try {
          data.items = JSON.parse(s.faqRows);
        } catch {
          data.items = [{ question: "", answer: "" }];
        }
      }
      
      // Breadcrumb এর জন্য special handling
      if (s.type.toLowerCase() === "breadcrumb_list" && s.breadcrumbs) {
        try {
          data.items = JSON.parse(s.breadcrumbs);
        } catch {
          data.items = [{ name: "", url: "" }];
        }
      }

      return {
        id: s.id,
        type: s.type,
        label: s.name,
        mode: s.mode || "form",
        data,
      };
    });
    setAddedSchemas(parsedSchemas);  // ✅ এটাই main কাজ!
  } else {
    setAddedSchemas([]);
  }
}
```

---

## 📊 ডেটা ফ্লো ডায়াগ্রাম

### আগে (BUG):
```
User → Fill Form → Click "Save Schema"
  ↓
Backend: Save to DB ✅
  ↓
Backend: Return updated group with schemas ✅
  ↓
Frontend: Receive data
  ↓
setActiveGroup() called ✅
  ↓
setAddedSchemas() NOT called ❌ ← BUG!
  ↓
UI: No re-render, no schemas showing ❌
```

### পরে (Fixed):
```
User → Fill Form → Click "Save Schema"
  ↓
Backend: Save to DB ✅
  ↓
Backend: Return updated group with schemas ✅
  ↓
Frontend: Receive data
  ↓
setActiveGroup() called ✅
  ↓
Parse schemas from data ✅
  ↓
setAddedSchemas() called ✅ ← FIX!
  ↓
UI: Re-renders with schemas showing ✅
```

---

## ✔️ ফিক্স করার পর কি কি পরীক্ষা করবে:

### Test 1: নতুন Schema Save করো
1. "Test Group" create করো
2. Local Business schema add করো
3. Form fill করো (Name, URL, Description)
4. "Save Schema" click করো
5. **Expected:** Schema data immediately UI তে দেখা যাবে, refresh করার প্রয়োজন নেই

### Test 2: Edit এবং Re-save করো
1. পুরনো schema edit করো
2. কোনো field এর value change করো
3. "Save Schema" click করো
4. **Expected:** Changes immediately update হবে UI তে

### Test 3: Multiple schemas add করো
1. দুটি schema add করো
2. "Save Schema" click করো
3. **Expected:** দুটোই UI তে দেখা যাবে

### Test 4: Page refresh করে confirm করো
1. Page refresh করো
2. **Expected:** সব schemas এখনো থাকবে (confirm যে DB এ save আছে)

---

## 🎯 AI Agent এর জন্য নির্দেশনা:

> **You are a React/JavaScript expert. Fix this bug in mahmud-144/schema-injector-app repository:**
>
> **Problem:** 
> - When user saves a schema group, data saves to database but frontend UI doesn't update
> - User doesn't see their saved schemas without page refresh
> 
> **File:** `app/routes/app._index.jsx`
> **Buggy Lines:** 534-560 (useEffect hook)
> **Reference Lines:** 463-504 (This useEffect has the working parsing logic)
>
> **What to do:**
> 1. Copy the schema parsing logic from lines 463-504
> 2. Add it to the useEffect at lines 534-560 (inside the `if (fetcher.data?.group)` block)
> 3. This will ensure schemas get parsed and UI gets updated after save
>
> **Result should be:**
> - After saving, schemas appear immediately in the form
> - No page refresh needed
> - All schema data displays correctly (name, type, form fields)
> - Multiple schemas work correctly
> - FAQ and Breadcrumb items parse correctly

---

## 📝 সারসংক্ষেপ:

| Item | Status | সমস্যা |
|------|--------|--------|
| Backend (save to DB) | ✅ OK | কোনো সমস্যা নেই |
| Backend (return data) | ✅ OK | সব কিছু ঠিকমতো return করছে |
| Frontend (parse schemas) | 🔴 BUG | Schemas parse করা হচ্ছে না |
| Frontend (update UI) | 🔴 BUG | UI update হচ্ছে না |

**Solution:** Lines 534-560 এ parsing logic যোগ করো - শেষ!

---

**Created:** August 19, 2026  
**Difficulty:** Easy (Copy-Paste + State Management)  
**Time to Fix:** 5-10 minutes
