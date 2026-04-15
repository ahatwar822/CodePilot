# 📌 Commit Message Guide (Conventional Commits)

This project follows a structured commit message format to keep history clean and professional.

---

## 🧠 Format

```
type(scope): short message
```

### Example:

```
fix(auth): resolve password hashing issue
```

---

## 🔧 Common Types

### ✨ feat → New feature

```
feat(auth): add login API with JWT
```

### 🐛 fix → Bug fix

```
fix(user): correct password hashing middleware
```

### ♻️ refactor → Code improvement (no feature/bug)

```
refactor(auth): simplify token generation logic
```

### 🔧 chore → Maintenance / config changes

```
chore: update dependencies
```

### 📝 docs → Documentation only

```
docs: update API documentation
```

### 🎨 style → Formatting (no logic change)

```
style: format code using prettier
```

### ⚡ perf → Performance improvement

```
perf(auth): optimize password comparison
```

### ✅ test → Add or update tests

```
test(auth): add unit tests for login
```

---

## 🔐 Real Examples (This Project)

### Fix password hashing bug

```
fix(auth): fix password hashing middleware in user model
```

### Protect routes with middleware

```
refactor(auth): protect routes using isAuthenticated middleware
```

### Add authentication system

```
feat(auth): implement JWT authentication system
```

---

## 🚨 Breaking Changes

Use `!` if change breaks existing API:

```
feat(auth)!: change login response structure
```

---

## 💡 Tips

* Use lowercase messages

* Keep it short but meaningful

* Avoid vague messages like:
  ❌ "fixed bug"
  ❌ "updated code"

* Be specific:
  ✅ "fix(auth): handle invalid refresh token"

---

## 🚀 Goal

Clean commits = easier debugging + better teamwork + professional codebase

---
