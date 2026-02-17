# QR Code Scanner - Troubleshooting Guide

## What to Do When "Something Went Wrong" Appears

### 1. **Camera Permission Error**

**Symptom**: "Camera permission denied" message
**Solution**:
```
Settings → App Permissions → Grant Camera Access
```

---

### 2. **"Invalid QR Code Format" Error**

**Symptom**: QR code scans but shows this error
**Causes & Fixes**:
- ✅ QR code doesn't contain valid session ID
- ✅ QR data is corrupted
- **Fix**: Generate new QR code with valid session ID

---

### 3. **"Session Not Found" Error**

**Symptom**: QR code is valid but session doesn't exist
**Causes & Fixes**:
- ✅ Session ID in QR code is incorrect
- ✅ Session was deleted
- ✅ Session ID format error
- **Fix**: Regenerate QR code from valid session

---

### 4. **"Session Is Not Active" Error**

**Symptom**: QR code is valid but session isn't running
**Causes & Fixes**:
- ✅ Session status is 'inactive' or 'completed'
- ✅ Trainer hasn't started the session yet
- **Fix**: Ask trainer to activate the session

---

### 5. **Network/Connection Errors**

**Symptom**: "Error verifying QR code" or timeout
**Causes & Fixes**:
- ✅ Backend not running
- ✅ Backend not accessible at configured URL
- ✅ Network connectivity issue

**Steps to Fix**:
1. Verify backend is running:
   ```bash
   cd backend && python app.py
   ```
   Should show: `Server starting on port 5000...`

2. Check API_BASE_URL in QRScannerScreen.tsx:
   ```typescript
   const API_BASE_URL = 'http://127.0.0.1:5000/api';
   ```
   Change `127.0.0.1` if backend is on different machine

3. Test connection from terminal:
   ```bash
   curl http://127.0.0.1:5000/health
   ```
   Should return: `{"success": true, "message": "Backend running"}`

---

### 6. **"Not Authenticated" Error**

**Symptom**: QR scan fails with authentication error
**Causes & Fixes**:
- ✅ User logged out
- ✅ Auth token expired
- ✅ localStorage cleared

**Fix**: Log in again and ensure token is stored

---

### 7. **Camera Not Focusing/Blurry Scan**

**Tips**:
- ✅ Ensure good lighting (use torch if needed)
- ✅ Hold phone steady for 2-3 seconds
- ✅ QR code should be 15-20cm away
- ✅ Clean camera lens

---

### 8. **QR Code Won't Scan at All**

**Symptom**: Scanner recognizes nothing
**Causes & Fixes**:
- ✅ QR code is too small
- ✅ QR code is damaged/faded
- ✅ Camera permission not granted
- ✅ Barcode scanner library issue

**Fix**:
```bash
# Reinstall barcode scanner
cd mobile && npm install expo-barcode-scanner
```

---

## Quick Debugging Checklist

### Before Scanning:
- [ ] Backend is running (`python app.py`)
- [ ] Frontend/Mobile app is running
- [ ] You're logged in
- [ ] Camera permission is granted
- [ ] Phone has internet connection

### During Scanning:
- [ ] Use good lighting
- [ ] Hold phone steady
- [ ] QR code is clearly visible
- [ ] QR code is in focus

### After Error:
1. Check browser console (F12)
2. Check backend logs
3. Try scanning again
4. Force close app and restart if persistent

---

## Backend Testing

### Test QR Endpoint Directly

```bash
# Generate test QR data
curl -X POST http://127.0.0.1:5000/api/sessions/verify-qr \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"qrData": "SESSION_ID_HERE"}'
```

### Expected Response (Success):
```json
{
  "success": true,
  "message": "QR code verified successfully",
  "data": {
    "session_id": "12345",
    "session_name": "Earthquake Training",
    "trainer_id": "trainer123"
  }
}
```

### Expected Response (Error):
```json
{
  "success": false,
  "message": "Session not found",
  "status_code": 404
}
```

---

## Common QR Code Formats

### Simple Format (Session ID only):
```
SESSION_ID_12345
```

### JSON Format:
```json
{
  "session_id": "SESSION_ID_12345",
  "session_name": "Earthquake Training",
  "location": "Training Center 1"
}
```

Both formats are supported by the scanner.

---

## Real-Time Logs

### Watch Backend Logs:
```bash
# Terminal in backend folder
python app.py
# Look for QR verification attempts
```

### Watch Mobile Console:
```bash
# In Expo dev tools (press 'j' after running npm start)
# Look for: "QR Code data:" and "Error processing QR code:"
```

---

## Reset/Retry

### If Nothing Works:
1. Clear app cache:
   ```bash
   # iOS Simulator
   xcrun simctl erase all
   
   # Android Emulator
   emulator -avd YOUR_AVD -wipe-data
   ```

2. Restart app:
   ```bash
   # Expo
   Press 'r' in terminal
   ```

3. Reinstall dependencies:
   ```bash
   cd mobile && rm -rf node_modules && npm install
   ```

---

## Generate QR Codes for Testing

### Using Online Tool:
1. Go to: https://www.qr-code-generator.com/
2. Enter session ID: `SESSION_ID_12345`
3. Download as PNG
4. Scan with app

### Using Python:
```bash
pip install qrcode pillow

# Create script:
cat > generate_qr.py << 'EOF'
import qrcode
import json

# Simple format
qr = qrcode.QRCode()
qr.add_data("SESSION_ID_12345")
qr.make()
img = qr.make_image()
img.save("qr_simple.png")

# JSON format
data = {"session_id": "SESSION_ID_12345", "name": "Training"}
qr = qrcode.QRCode()
qr.add_data(json.dumps(data))
qr.make()
img = qr.make_image()
img.save("qr_json.png")

print("QR codes generated!")
EOF

python generate_qr.py
```

---

## Contact & Support

If issue persists:
1. Check browser console errors (F12)
2. Check backend terminal output
3. Verify network connectivity
4. Try on different phone/device
5. Contact development team with error message

---

**Last Updated**: February 12, 2026
**Version**: 1.0.0
