import os
import ast

used_modules = set()

# עברי על כל קבצי .py בפרויקט
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".py"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                try:
                    tree = ast.parse(f.read(), filename=path)
                    for node in ast.walk(tree):
                        if isinstance(node, ast.Import):
                            for alias in node.names:
                                used_modules.add(alias.name.split('.')[0])
                        elif isinstance(node, ast.ImportFrom):
                            if node.module:
                                used_modules.add(node.module.split('.')[0])
                except SyntaxError:
                    print(f"⚠ שגיאה בקובץ {path} (ייתכן שהוא מכיל שגיאת תחביר)")

print("📦 המודולים שזוהו בקוד שלך:")
for module in sorted(used_modules):
    print("-", module)
