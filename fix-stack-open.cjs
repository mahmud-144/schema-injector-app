const fs = require('fs');
const content = fs.readFileSync('app/routes/app._index.jsx', 'utf8');
const lines = content.split('\n');

// Find the line with the form conditional
const targetLine = '                        {schema.type === "local_business" && (';
const targetIdx = lines.findIndex(l => l.trim() === targetLine.trim());

if (targetIdx === -1) {
  console.log('Target line not found');
  process.exit(1);
}

// Insert the missing s-stack opening tag before it
lines.splice(targetIdx, 0, '                      <s-stack direction="block" gap="base" style={{ marginTop: "12px" }}>');

const newContent = lines.join('\n');
fs.writeFileSync('app/routes/app._index.jsx', newContent);
console.log('Inserted missing s-stack opening tag at line ' + (targetIdx + 1));
