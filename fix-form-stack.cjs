const fs = require('fs');
const content = fs.readFileSync('app/routes/app._index.jsx', 'utf8');

const oldText = `                    {schema.mode === "form" && schema.type && toSchemaType(schema.type) !== "CustomJSON" && (

                        {schema.type === "local_business" && (`;

const newText = `                    {schema.mode === "form" && schema.type && toSchemaType(schema.type) !== "CustomJSON" && (
                      <s-stack direction="block" gap="base" style={{ marginTop: "12px" }}>
                        {schema.type === "local_business" && (`;

if (!content.includes(oldText)) {
  console.log('Old text not found');
  process.exit(1);
}

const newContent = content.replace(oldText, newText);
fs.writeFileSync('app/routes/app._index.jsx', newContent);
console.log('Fixed form stack opening tag');
