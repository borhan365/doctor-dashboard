export const getVerificationEmailTemplate = (otp: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #4F46E5;
            letter-spacing: 4px;
            padding: 20px;
            background: #F3F4F6;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        .warning {
            color: #991B1B;
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Email Address</h1>
        <p>Please use the following verification code to complete your registration:</p>
        <div class="otp-code">${otp}</div>
        <p>This code will expire in 10 minutes.</p>
        <p class="warning">If you didn't request this code, please ignore this email.</p>
    </div>
</body>
</html>
`; 