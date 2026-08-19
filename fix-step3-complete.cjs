const fs = require('fs');
const content = fs.readFileSync('app/routes/app._index.jsx', 'utf8');

const missingContent = `
                        {schema.type === "local_business" && (
                          <>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Business Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Website URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Business Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} multiline={3} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Logo / Image URL" value={schema.data?.logoUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Telephone" value={schema.data?.telephone || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "telephone", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Price Range" value={schema.data?.priceRange || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "priceRange", e.target.value)} placeholder="e.g., $" />
                            <s-text-field label="Street Address" value={schema.data?.street || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "street", e.target.value)} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="City" value={schema.data?.city || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "city", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="State / Region" value={schema.data?.state || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "state", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="Postal Code" value={schema.data?.postalCode || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "postalCode", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Country" value={schema.data?.country || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "country", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Latitude" value={schema.data?.latitude || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "latitude", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Longitude" value={schema.data?.longitude || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "longitude", e.target.value)} />
                              </div>
                            </s-stack>
                          </>
                        )}
                        
                        {schema.type === "product" && (
                          <>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Product Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} placeholder="Product Name" />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Product URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} placeholder="https://" />
                              </div>
                            </s-stack>
                            <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} placeholder="Description" multiline={3} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} placeholder="https://" />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Brand" value={schema.data?.brand || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "brand", e.target.value)} placeholder="Brand" />
                              </div>
                            </s-stack>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="SKU" value={schema.data?.sku || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "sku", e.target.value)} placeholder="SKU" />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Price" value={schema.data?.price || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "price", e.target.value)} placeholder="" />
                              </div>
                            </s-stack>
                            <s-text-field label="Currency" value={schema.data?.currency || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "currency", e.target.value)} placeholder="Currency" helperText="ISO 4217 e.g., USD, EUR, BDT" />
                          </>
                        )}

                        {schema.type === "organization" && (
                          <>
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Organization Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Website URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} multiline={3} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Logo / Image URL" value={schema.data?.logoUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 45%", minWidth: "200px" }}>
                                <s-text-field label="Logo URL" value={schema.data?.logoUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Telephone" value={schema.data?.telephone || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "telephone", e.target.value)} />
                            <s-text-field label="Street Address" value={schema.data?.street || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "street", e.target.value)} />
                            <s-stack direction="inline" blockAlign="center" gap="base" style={{ flexWrap: "wrap" }}>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="City" value={schema.data?.city || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "city", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="State / Region" value={schema.data?.state || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "state", e.target.value)} />
                              </div>
                              <div style={{ flex: "1 1 30%", minWidth: "150px" }}>
                                <s-text-field label="Postal Code" value={schema.data?.postalCode || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "postalCode", e.target.value)} />
                              </div>
                            </s-stack>
                            <s-text-field label="Country" value={schema.data?.country || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "country", e.target.value)} />
                          </>
                        )}

                        {schema.type === "service" && (
                          <>
                            <s-text-field label="Service Name" value={schema.data?.name || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "name", e.target.value)} />
                            <s-text-field label="URL" value={schema.data?.url || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "url", e.target.value)} />
                            <s-text-field label="Description" value={schema.data?.description || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "description", e.target.value)} multiline={3} />
                            <s-text-field label="Image URL" value={schema.data?.imageUrl || ""} onChange={(e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value)} />
                          </>
                        )}

                        <s-box padding="base" borderWidth="base" borderRadius="base" background="subdued">
                          <s-stack direction="block" gap="base">
                            <s-text type="strong">Custom Properties (optional JSON)</s-text>
                            <s-paragraph tone="subdued">Merged into the schema. Use for anything the form does not cover.</s-paragraph>
                            <s-text-field
                              label="JSON"
                              value={schema.data?.customJson || ""}
                              onChange={(e) => handleSchemaFieldChange(schema.id, "customJson", e.target.value)}
                              multiline={4}
                              style={{ fontFamily: "monospace" }}
                            />
                          </s-stack>
                        </s-box>
                      </s-stack>
                    )}
                  </s-stack>
                </div>
              ))}
            </s-stack>

            {addedSchemas.length === 0 && (
              <s-paragraph tone="subdued">
                No schemas yet. Click + Add Schema, pick a type (e.g., FAQ Page), and fill in the fields.
              </s-paragraph>
            )}

            <s-stack direction="inline" gap="base" style={{ marginTop: "16px" }}>
              <s-button variant="primary" onClick={handleAddSchema}>+ Add Schema</s-button>
            </s-stack>
          </s-stack>
        </s-section>
`;

const marker = '                    {schema.mode === "form" && schema.type && toSchemaType(schema.type) !== "CustomJSON" && (\n                      <s-stack direction="block" gap="base" style={{ marginTop: "12px" }}>';
const idx = content.indexOf(marker);

if (idx === -1) {
  console.log('Marker not found');
  process.exit(1);
}

const newContent = content.slice(0, idx) + missingContent + content.slice(idx + marker.length).split('\n').slice(1).join('\n');
fs.writeFileSync('app/routes/app._index.jsx', newContent);
console.log('Fixed Step 3 layout successfully');
