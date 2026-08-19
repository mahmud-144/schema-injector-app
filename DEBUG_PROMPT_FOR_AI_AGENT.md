# DEBUG PROMPT FOR AI AGENT - Schema Data Flow Issue

## Problem Statement
The app saves schema data to the database successfully, but **Frontend doesn't receive/display the data after save**. When editing later, the old data shows (meaning it's in the DB), but the initial save doesn't push data to the frontend state.

## Current Architecture Understanding

### Database (Prisma)
- **Models:** `SchemaGroup`, `Schema`, `SchemaTarget` in `prisma/schema.prisma`
- **Status:** Data IS being saved ✓ (confirmed by edit showing old data)

### Backend API
- **Route:** `app/routes/api.schema.$slug.jsx` (Line 4-88)
- **Status:** Serves schemas from DB ✓
- **Function:** `getGroup(shop, slug)` in `app/schema.server.js` fetches group with schemas

### Frontend Issue (MAIN PROBLEM)
- **File:** `app/routes/app._index.jsx` (2000+ lines)
- **Issue:** After form submission (`handleSaveGroup` at Line 675), state doesn't update with new data
- **Evidence:**
  - Data saves to DB (seen on edit refresh)
  - `activeGroup` state exists
  - Schemas added via `setAddedSchemas()` but not fetched back after save

## Task for AI Agent

### Step 1: Identify Current Flow
1. **Locate the form submission handler:**
   - Find where "Save Schema" button calls the backend
   - Check if it uses `fetcher.submit()` from React Router
   - Extract the FormData being sent

2. **Check the action handler:**
   - In `app._index.jsx`, find the `export const action` section
   - Look for the `actionType === "saveGroup"` block (around Line 178)
   - Verify what it returns (does it return `{ group, ...}` ?)

3. **Check frontend state update:**
   - Find where `fetcher.data` is consumed (should be in `useEffect`, around Line 534-560)
   - Verify if it's updating `activeGroup` and `addedSchemas` state
   - **LIKELY ISSUE:** Check if the returned data structure matches what state expects

### Step 2: Trace Data Flow
- **Question 1:** When user clicks "Save Schema", what FormData is being sent?
  ```
  What fields? (action, groupId, schemas, isActive)
  Schemas format? (JSON string of array?)
  ```

- **Question 2:** What does the backend return after save?
  ```
  Check Line 193 in app._index.jsx:
  return { group: updatedGroup, message: "Schema saved successfully!" };
  ```
  Does `updatedGroup` include the `schemas` array with all fields?

- **Question 3:** Does frontend state update from returned data?
  ```
  Search for: "if (fetcher.data?.group)"
  Does it run setAddedSchemas()?
  Does it reconstruct the schema objects correctly?
  ```

### Step 3: Find the Bug
Debug these potential issues:

#### Issue A: Schema data not being returned from backend
- [ ] Verify `getGroup()` in `schema.server.js` (Line 29-37) returns schemas
- [ ] Check if `updateGroup()` triggers the database fetch
- [ ] Look at Line 190 in `app._index.jsx`: Does `updatedGroup` actually contain schema data?

#### Issue B: Frontend receives data but doesn't parse it correctly
- [ ] Check how `addedSchemas` is reconstructed from fetched group
- [ ] Look at Lines 463-504 where edit mode loads schemas
- [ ] **CRITICAL:** Does the returned schema object match expected format?
  ```javascript
  Expected: { id, type, label, mode, data }
  Check if backend returns: { id, groupId, type, name, mode, jsonContent, formData, ... }
  ```
  ↑ **MISMATCH?** Backend sends different field names!

#### Issue C: State not triggering UI re-render
- [ ] Verify React state hook dependencies in useEffect (Line 535-560)
- [ ] Check if `setAddedSchemas()` is actually being called
- [ ] Confirm `fetcher.data?.group` exists after save

### Step 4: Implement Fix
Create a solution that:
1. **Ensures backend returns complete schema data after save**
   - Modify action handler to return `group` with full schema objects
   
2. **Ensures frontend parses returned data correctly**
   - Transform backend schema format to expected state format
   - Handle field name mismatches (name → label, etc.)

3. **Ensures frontend updates state immediately**
   - Call `setAddedSchemas()` with properly formatted data
   - Call `setActiveGroup()` to trigger re-render

## Expected Test Results

**Before Fix:**
- Click "Save Schema" button
- Schema saves to DB (can verify by page refresh)
- But `activeGroup` and `addedSchemas` don't update in UI

**After Fix:**
- Click "Save Schema" button
- Schemas appear immediately in the form
- User can edit without page refresh
- Next time they load the page, data is there (from DB)

## Files to Review (in order)
1. `app/routes/app._index.jsx` - Lines 675-707 (handleSaveGroup)
2. `app/routes/app._index.jsx` - Lines 39-223 (action handler, saveGroup branch)
3. `app/schema.server.js` - Lines 45-83 (updateGroup, saveSchemas, getGroup)
4. `app/routes/app._index.jsx` - Lines 534-560 (useEffect for fetcher.data)
5. `app/routes/app._index.jsx` - Lines 463-504 (schema parsing from backend)

---

## Command for AI Agent

> **You are a Shopify React Router expert. Debug the schema data flow in mahmud-144/schema-injector-app. The issue: Frontend doesn't update with data after saving, even though data persists in the database. Follow the 4-step investigation above, identify the exact bug (likely in field name mapping or state update logic), and provide a fix with code examples. Focus on:**
> 
> **1. Check if backend returns schemas after save (schema.server.js)**
> **2. Check if frontend state updates from returned data (app._index.jsx useEffect)**
> **3. Check for field name mismatches (backend: `name`, frontend: `label`)**
> **4. Provide a working fix that ensures data flows Frontend → Backend → Frontend immediately**

---

## Success Criteria

✅ AI Agent provides:
- [ ] Exact line numbers of the bug
- [ ] Explanation of why data flow breaks
- [ ] Code diff showing the fix
- [ ] Before/after comparison of data flow
- [ ] Verification that fix works (manual test steps)

