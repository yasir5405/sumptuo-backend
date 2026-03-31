import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (to: string, name: string) => {
  const { error } = await resend.emails.send({
    from: "Sumptuo <noreply@sumptuo.app>",
    to,
    subject: "Welcome to Sumptuo",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Sumptuo</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#080808;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding:0 0 40px 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr><td style="width:20px;height:4px;background:#22c55e;border-radius:2px;font-size:0;line-height:4px;">&nbsp;</td></tr>
                      <tr><td style="height:3px;font-size:0;line-height:3px;">&nbsp;</td></tr>
                      <tr><td style="width:13px;height:4px;background:#22c55e;border-radius:2px;font-size:0;line-height:4px;">&nbsp;</td></tr>
                      <tr><td style="height:3px;font-size:0;line-height:3px;">&nbsp;</td></tr>
                      <tr><td style="width:20px;height:4px;background:#22c55e;border-radius:2px;font-size:0;line-height:4px;">&nbsp;</td></tr>
                    </table>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">Sumptuo</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#0f0f0f;border:1px solid #1c1c1c;border-radius:16px;overflow:hidden;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:52px 48px 44px 48px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                      <tr>
                        <td style="background:#0a1f0a;border:1px solid #173317;border-radius:100px;padding:6px 14px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="vertical-align:middle;padding-right:7px;">
                                <div style="width:6px;height:6px;background:#22c55e;border-radius:50%;font-size:0;line-height:6px;">&nbsp;</div>
                              </td>
                              <td style="vertical-align:middle;">
                                <span style="font-size:12px;font-weight:600;color:#22c55e;letter-spacing:0.02em;">Account activated</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <h1 style="margin:0 0 18px 0;font-size:34px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;line-height:1.15;">
                      The personal finance<br/>system for clarity<br/>and control.
                    </h1>
                    <p style="margin:0 0 36px 0;font-size:15px;color:#555;line-height:1.7;">
                      Hi <strong style="color:#999;font-weight:500;">${name}</strong> — welcome aboard. Your account is live. Understand your spending, stay on budget, and plan ahead — all without connecting your bank.
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#22c55e;border-radius:100px;padding:13px 26px;">
                          <a href="https://sumptuo.app/dashboard" style="font-size:14px;font-weight:700;color:#000000;text-decoration:none;letter-spacing:-0.01em;white-space:nowrap;">
                            Get Started &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:0 48px;"><div style="height:1px;background:#191919;font-size:0;line-height:0;">&nbsp;</div></td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:36px 48px 40px 48px;">
                    <p style="margin:0 0 24px 0;font-size:11px;font-weight:600;color:#2e2e2e;letter-spacing:0.1em;text-transform:uppercase;">What you get</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
                      <tr>
                        <td style="width:36px;vertical-align:top;padding-top:1px;">
                          <div style="width:30px;height:30px;background:#111;border:1px solid #1e1e1e;border-radius:8px;text-align:center;line-height:30px;font-size:14px;">📊</div>
                        </td>
                        <td style="padding-left:16px;vertical-align:top;">
                          <p style="margin:0 0 4px 0;font-size:14px;font-weight:600;color:#e0e0e0;letter-spacing:-0.01em;">Expense Tracking</p>
                          <p style="margin:0;font-size:13px;color:#484848;line-height:1.55;">Log and categorize every transaction. See exactly where your money goes each month.</p>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
                      <tr>
                        <td style="width:36px;vertical-align:top;padding-top:1px;">
                          <div style="width:30px;height:30px;background:#111;border:1px solid #1e1e1e;border-radius:8px;text-align:center;line-height:30px;font-size:14px;">🤖</div>
                        </td>
                        <td style="padding-left:16px;vertical-align:top;">
                          <p style="margin:0 0 4px 0;font-size:14px;font-weight:600;color:#e0e0e0;letter-spacing:-0.01em;">AI Financial Coach</p>
                          <p style="margin:0;font-size:13px;color:#484848;line-height:1.55;">Get personalized insights and suggestions powered by AI — built right into your dashboard.</p>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:36px;vertical-align:top;padding-top:1px;">
                          <div style="width:30px;height:30px;background:#111;border:1px solid #1e1e1e;border-radius:8px;text-align:center;line-height:30px;font-size:14px;">🔒</div>
                        </td>
                        <td style="padding-left:16px;vertical-align:top;">
                          <p style="margin:0 0 4px 0;font-size:14px;font-weight:600;color:#e0e0e0;letter-spacing:-0.01em;">Privacy First</p>
                          <p style="margin:0;font-size:13px;color:#484848;line-height:1.55;">No bank linking required. Your data lives with you — never sold, never shared.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:0 48px;"><div style="height:1px;background:#191919;font-size:0;line-height:0;">&nbsp;</div></td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:26px 48px 36px 48px;">
                    <p style="margin:0;font-size:13px;color:#383838;line-height:1.65;">
                      Questions? Reply to this email or reach us at
                      <a href="mailto:support@sumptuo.app" style="color:#22c55e;text-decoration:none;font-weight:500;">support@sumptuo.app</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 0 0;">
              <p style="margin:0 0 5px 0;font-size:12px;color:#252525;">&copy; 2025 Sumptuo. All rights reserved.</p>
              <p style="margin:0;font-size:12px;color:#252525;">
                You received this because you signed up at <a href="https://sumptuo.app" style="color:#252525;text-decoration:none;">sumptuo.app</a>
                &nbsp;&middot;&nbsp;
                <a href="https://sumptuo.app/unsubscribe" style="color:#252525;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });

  if (error) throw new Error(error.message);
};

export const sendOtpEmail = async (to: string, otp: string) => {
  const { error } = await resend.emails.send({
    from: "Sumptuo <noreply@sumptuo.app>",
    to,
    subject: "Your password reset code",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset your password</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#080808;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
          <!-- Logo -->
          <tr>
            <td style="padding:0 0 40px 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr><td style="width:20px;height:4px;background:#22c55e;border-radius:2px;font-size:0;line-height:4px;">&nbsp;</td></tr>
                      <tr><td style="height:3px;font-size:0;line-height:3px;">&nbsp;</td></tr>
                      <tr><td style="width:13px;height:4px;background:#22c55e;border-radius:2px;font-size:0;line-height:4px;">&nbsp;</td></tr>
                      <tr><td style="height:3px;font-size:0;line-height:3px;">&nbsp;</td></tr>
                      <tr><td style="width:20px;height:4px;background:#22c55e;border-radius:2px;font-size:0;line-height:4px;">&nbsp;</td></tr>
                    </table>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">Sumptuo</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#0f0f0f;border:1px solid #1c1c1c;border-radius:16px;overflow:hidden;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:52px 48px 44px 48px;">

                    <!-- Badge -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                      <tr>
                        <td style="background:#1a1208;border:1px solid #2e1f08;border-radius:100px;padding:6px 14px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="vertical-align:middle;padding-right:7px;">
                                <div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;font-size:0;line-height:6px;">&nbsp;</div>
                              </td>
                              <td style="vertical-align:middle;">
                                <span style="font-size:12px;font-weight:600;color:#f59e0b;letter-spacing:0.02em;">Password reset requested</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Heading -->
                    <h1 style="margin:0 0 18px 0;font-size:34px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;line-height:1.15;">
                      Your reset<br/>code is here.
                    </h1>

                    <p style="margin:0 0 36px 0;font-size:15px;color:#555;line-height:1.7;">
                      Use the code below to reset your password. It expires in <strong style="color:#999;font-weight:500;">10 minutes</strong>.
                    </p>

                    <!-- OTP Block -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                      <tr>
                        <td style="background:#111;border:1px solid #1e1e1e;border-radius:12px;padding:20px 36px;text-align:center;">
                          <span style="font-size:40px;font-weight:800;color:#ffffff;letter-spacing:0.25em;font-variant-numeric:tabular-nums;">${otp}</span>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;font-size:13px;color:#383838;line-height:1.65;">
                      If you didn't request a password reset, you can safely ignore this email. Your account remains secure.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:0 48px;"><div style="height:1px;background:#191919;font-size:0;line-height:0;">&nbsp;</div></td></tr>
              </table>

              <!-- Footer note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:26px 48px 36px 48px;">
                    <p style="margin:0;font-size:13px;color:#383838;line-height:1.65;">
                      Questions? Reach us at
                      <a href="mailto:support@sumptuo.app" style="color:#22c55e;text-decoration:none;font-weight:500;">support@sumptuo.app</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom -->
          <tr>
            <td style="padding:28px 0 0 0;">
              <p style="margin:0 0 5px 0;font-size:12px;color:#252525;">&copy; 2025 Sumptuo. All rights reserved.</p>
              <p style="margin:0;font-size:12px;color:#252525;">
                You received this because a password reset was requested for your account at <a href="https://sumptuo.app" style="color:#252525;text-decoration:none;">sumptuo.app</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });

  if (error) {
    throw new Error(error.message);
  }
};
