const fs = require('fs');
const content = fs.readFileSync('app/routes/app._index.jsx', 'utf8');

const newStep3 = `
        {/* Step 3: Add Schema Data */}
        <s-section heading="3. Add Schema Data">
          <s-stack direction="block" gap="base">
            <s-paragraph>
              Add one or more schemas. Choose a Schema Type and the matching fields appear automatically. Toggle Direct JSON mode to paste raw JSON-LD.
            </s-paragraph>

            <s-stack direction="block" gap="base">
              {addedSchemas.map((schema) => (
                <div
                  key={schema.id}
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    border: "1px solid #e1e3e5",
                    backgroundColor: "#ffffff",
                    marginBottom: "16px",
                  }}
                >
                  <s-stack direction="block" gap="base">
                    <s-stack direction="inline" blockAlign="center" gap="base" style={{ justifyContent: "space-between" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <s-text-field
                          label="Schema Name"
                          value={schema.label || ""}
                          onChange={(e) => handleSchemaLabelChange(schema.id, e.target.value)}
                          placeholder="e.g., localbusiness schema"
                          autoComplete="off"
                        />
                      </div>
                      <s-button variant="secondary" tone="critical" onClick={() => handleRemoveSchema(schema.id)}>Remove</s-button>
                    </s-stack>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <strong>Schema Type</strong>
                        <select
                          value={schema.type}
                          onChange={(e) => handleSchemaTypeChange(schema.id, e.target.value)}
                          style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #c9cccf", background: "#fff", fontSize: "14px" }}
                        >
                          <option value="" disabled>Select a schema type...</option>
                          <optgroup label="Business">
                            <option value="local_business">Local Business</option>
                            <option value="organization">Organization</option>
                            <option value="service">Service</option>
                          </optgroup>
                          <optgroup label="Commerce">
                            <option value="product">Product</option>
                          </optgroup>
                          <optgroup label="Content">
                            <option value="article">Article</option>
                            <option value="event">Event</option>
                            <option value="faq_page">FAQ Page</option>
                            <option value="person">Person</option>
                          </optgroup>
                          <optgroup label="Site">
                            <option value="breadcrumb_list">Breadcrumb List</option>
                            <option value="web_page">Web Page</option>
                            <option value="web_site">Web Site</option>
                          </optgroup>
                        </select>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>Mode</span>
                        <div style={{ display: "flex", background: "#eef0f2", padding: "3px", borderRadius: "6px" }}>
                          <button
                            type="button"
                            onClick={() => handleSchemaModeChange(schema.id, "form")}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              background: schema.mode === "form" ? "#000000" : "transparent",
                              color: schema.mode === "form" ? "#ffffff" : "#303030",
                              fontWeight: "bold",
                            }}
                          >
                            Form
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSchemaModeChange(schema.id, "json")}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                              background: schema.mode === "json" ? "#000000" : "transparent",
                              color: schema.mode === "json" ? "#ffffff" : "#303030",
                              fontWeight: "bold",
                            }}
                          >
                            Direct JSON
                          </button>
                        </div>
                      </div>
                    </div>

                    <s-paragraph tone="subdued">
                      {getSchemaDescription(toSchemaType(schema.type))}
                    </s-paragraph>

                    {schema.mode === "json" && (
                      <s-stack direction="block" gap="base" style={{ marginTop: "12px" }}>
                        <s-paragraph tone="subdued">
                          Paste complete JSON-LD below. It is injected exactly as written.
                        </s-paragraph>
                        <textarea
                          value={schema.data?.json || ""}
                          onChange={(e) => handleSchemaFieldChange(schema.id, "json", e.target.value)}
                          rows={12}
                          style={{
                            width: "100%",
                            minHeight: "260px",
                            fontFamily: "monospace, 'Fira Code', 'Courier New', monospace",
                            fontSize: "13px",
                            lineHeight: "1.5",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #c9cccf",
                            backgroundColor: "#fafafa",
                            whiteSpace: "pre",
                            overflowX: "auto",
                            boxSizing: "border-box",
                            resize: "vertical",
                          }}
                          placeholder={\`{ "@context": "https://schema.org", "@type": "\${toSchemaType(schema.type) || 'LocalBusiness'}", "name": "My Business" }\`}
                        />
                      </s-stack>
                    )}

                    {schema.mode === "form" && schema.type && toSchemaType(schema.type) !== "CustomJSON" && (
                      <s-stack direction="block" gap="base" style={{ marginTop: "12px" }}>
`;

const startMarker = '        {/* Step 3: Add Schema Data */}';
const endMarker = '        </s-section>';

const startIdx = content.indexOf(startMarker);
const endIdx = content.lastIndexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found');
  process.exit(1);
}

let before = content.slice(0, startIdx);
let after = content.slice(endIdx);

const newContent = before + newStep3 + after;
fs.writeFileSync('app/routes/app._index.jsx', newContent);
console.log('Replaced Step 3 header and cards successfully');
