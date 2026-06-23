const fs = require('fs');
const path = require('path');
const root = process.cwd();
const src = path.join(root, 'src');
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|js|jsx)$/.test(name)) files.push(p);
  }
}
walk(src);
const importRegex = /import\s+(?:[^"'\n]+?\s+from\s+)?(["'])(\.\.?(?:\/[^"']+)*)\1/g;
const errors = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = importRegex.exec(text))) {
    const spec = m[2];
    if (spec.startsWith('.') || spec.startsWith('/')) {
      const dir = path.dirname(file);
      const candidates = [];
      if (path.extname(spec)) candidates.push(spec);
      else candidates.push(
        spec + '.ts',
        spec + '.tsx',
        spec + '.js',
        spec + '.jsx',
        path.join(spec, 'index.ts'),
        path.join(spec, 'index.tsx'),
        path.join(spec, 'index.js'),
        path.join(spec, 'index.jsx'),
      );
      let candidate = null;
      for (const c of candidates) {
        const abs = path.resolve(dir, c);
        if (fs.existsSync(abs)) {
          candidate = abs;
          break;
        }
      }
      if (candidate) {
        const rel = path.relative(root, candidate).split(path.sep);
        let cur = root;
        for (const part of rel) {
          const items = fs.readdirSync(cur);
          const exact = items.find((i) => i === part);
          if (!exact) {
            const found = items.find((i) => i.toLowerCase() === part.toLowerCase());
            if (found) {
              errors.push({
                file: path.relative(root, file),
                spec,
                expected: path.relative(root, candidate),
                actual: path.relative(root, path.join(cur, found)),
                segment: part,
                found,
              });
            }
            break;
          }
          cur = path.join(cur, exact);
        }
      }
    }
  }
}
if (errors.length) {
  console.log(JSON.stringify(errors, null, 2));
  process.exit(1);
}
console.log('No case mismatches found');
