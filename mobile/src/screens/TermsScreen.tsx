import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";

export default function TermsScreen({ navigation, route }: any) {
  const theme = useTheme();


  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      >


        <Text style={{ color: "#888", marginBottom: 5 }}>
            Effective Date: April 17, 2026
        </Text>

        <Text style={{ color: "#888", marginBottom: 20 }}>
            Last Updated: April 17, 2026
        </Text>

        <Text style={{ color: "#888", marginBottom: 5 }}>
            Welcome to RUSH ("we", "our", "us"). These Terms & Conditions ("Terms") explain how you can use our mobile app, website, and services (together called the "Service").
            {"\n\n"}
            By using RUSH, you agree to these Terms and our Privacy Policy.
            {"\n\n"}
            If you do not agree, please do not use the platform.
        </Text>


        {/* SECTION */}
        <Text style={styles.heading(theme)}>1. About RUSH</Text>
        <Text style={styles.text(theme)}>
            RUSH is a job marketplace designed mainly for{" "}
            <Text style={{ fontWeight: "bold" }}>nearby and blue-collar jobs</Text>, where:
            {"\n\n"}
            • Job seekers ("Workers") can find jobs near their location, apply, and chat with employers.
            {"\n"}
            • Employers ("Businesses") can post jobs, find candidates, and hire directly.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>Important:</Text> WorkNear only connects people.
            {"\n"}
            We do <Text style={{ fontWeight: "bold" }}>not guarantee jobs, hiring, or employee performance</Text>.
        </Text>



        <Text style={styles.heading(theme)}>2. Eligibility</Text>
        <Text style={styles.text(theme)}>
            To use RUSH:
            {"\n\n"}
            • You must be at least 18 years old (or legal working age in your area).
            {"\n"}
            • You must provide <Text style={{ fontWeight: "bold" }}>true and correct information</Text>.
            {"\n"}
            • You must use the platform <Text style={{ fontWeight: "bold" }}>legally and respectfully</Text>.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>We can suspend or remove accounts</Text> that break these rules.
        </Text>


        <Text style={styles.heading(theme)}>3. Account Registration</Text>
        <Text style={styles.text(theme)}>
            • You must register using a <Text style={{ fontWeight: "bold" }}>valid mobile number</Text> (OTP-based login).
            {"\n"}
            • You are <Text style={{ fontWeight: "bold" }}>responsible for your account</Text> and all activity under it.
            {"\n"}
            • Keep your <Text style={{ fontWeight: "bold" }}>login details safe</Text>.
            {"\n"}
            • If your account is misused, inform us immediately.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>RUSH is not responsible</Text> for losses caused by <Text style={{ fontWeight: "bold" }}>unauthorized access</Text>.
        </Text>

        <Text style={styles.heading(theme)}>4. What RUSH Provides</Text>
        <Text style={styles.text(theme)}>
            RUSH allows you to:
            {"\n\n"}
            • <Text style={{ fontWeight: "bold" }}>Create a Worker or Employer profile</Text>
            {"\n"}
            • Find <Text style={{ fontWeight: "bold" }}>nearby jobs or candidates</Text>
            {"\n"}
            • Chat directly within the app
            {"\n"}
            • Post and apply for jobs
            {"\n"}
            • Get job alerts and recommendations
            {"\n\n"}
            We may <Text style={{ fontWeight: "bold" }}>update, change, or remove features</Text> anytime.
        </Text>

        <Text style={styles.heading(theme)}>5. User Responsibilities</Text>
        <Text style={styles.text(theme)}>
            You agree <Text style={{ fontWeight: "bold" }}>NOT</Text> to:
            {"\n\n"}
            • Post fake jobs or fake profiles
            {"\n"}
            • Share wrong or misleading information
            {"\n"}
            • Harass, spam, or abuse other users
            {"\n"}
            • Share illegal, offensive, or harmful content
            {"\n"}
            • Use bots, scraping tools, or automation
            {"\n"}
            • Impersonate someone else
            {"\n\n"}
            Breaking these rules can lead to <Text style={{ fontWeight: "bold" }}>account suspension or permanent ban</Text>.
        </Text>

        <Text style={styles.heading(theme)}>6. Jobs & Applications</Text>
        <Text style={styles.text(theme)}>
            • Employers are responsible for <Text style={{ fontWeight: "bold" }}>job details</Text> (salary, role, location, etc.)
            {"\n"}
            • Workers are responsible for their <Text style={{ fontWeight: "bold" }}>profile and skills</Text>
            {"\n"}
            • RUSH does not verify every job or candidate
            {"\n\n"}
            We are not responsible for:
            {"\n"}
            • <Text style={{ fontWeight: "bold" }}>Hiring decisions</Text>
            {"\n"}
            • <Text style={{ fontWeight: "bold" }}>Interview results</Text>
            {"\n"}
            • <Text style={{ fontWeight: "bold" }}>Salary agreements</Text>
            {"\n"}
            • <Text style={{ fontWeight: "bold" }}>Job outcomes</Text>
        </Text>

        <Text style={styles.heading(theme)}>7. Chat & Communication</Text>
        <Text style={styles.text(theme)}>
            • The chat feature is for <Text style={{ fontWeight: "bold" }}>job-related communication only</Text>.
            {"\n"}
            • Be <Text style={{ fontWeight: "bold" }}>professional and respectful</Text>.
            {"\n"}
            • Do not share sensitive info like:
            {"\n"}   – Bank details
            {"\n"}   – OTPs
            {"\n"}   – Personal financial data
            {"\n\n"}
            We may <Text style={{ fontWeight: "bold" }}>monitor chats</Text> to prevent fraud or misuse.
        </Text>

        <Text style={styles.heading(theme)}>8. Payments (If Introduced)</Text>
        <Text style={styles.text(theme)}>
            If RUSH offers paid features (like premium listings):
            {"\n\n"}
            • Prices will be <Text style={{ fontWeight: "bold" }}>shown clearly</Text> in the app.
            {"\n"}
            • Payments are <Text style={{ fontWeight: "bold" }}>non-refundable</Text> unless stated.
            {"\n"}
            • Users are responsible for <Text style={{ fontWeight: "bold" }}>taxes</Text> (if any).
            {"\n"}
            • We can <Text style={{ fontWeight: "bold" }}>change pricing anytime</Text> with notice.
        </Text>

        <Text style={styles.heading(theme)}>9. Content Ownership</Text>
        <Text style={styles.text(theme)}>
            • You <Text style={{ fontWeight: "bold" }}>own the content</Text> you post (profile, job posts, messages).
            {"\n"}
            • By posting, you allow us to use it to run and improve the platform.
            {"\n\n"}
            RUSH owns:
            {"\n"}   – App design
            {"\n"}   – Logo & branding
            {"\n"}   – Technology
            {"\n\n"}
            Do not <Text style={{ fontWeight: "bold" }}>copy or misuse</Text> our platform or brand.
        </Text>

        <Text style={styles.heading(theme)}>10. Privacy & Data</Text>
        <Text style={styles.text(theme)}>
            • Your data is handled as per our <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>.
            {"\n"}
            • By using RUSH, you agree that we may:
            {"\n"}   – Collect and store your data
            {"\n"}   – Use it to improve services
            {"\n"}   – Ensure platform safety
        </Text>

        <Text style={styles.heading(theme)}>11. Disclaimer</Text>
        <Text style={styles.text(theme)}>
            RUSH is only a <Text style={{ fontWeight: "bold" }}>connecting platform</Text>.
            {"\n\n"}
            We do <Text style={{ fontWeight: "bold" }}>NOT</Text>:
            {"\n"}   • Guarantee jobs
            {"\n"}   • Verify every user
            {"\n"}   • Control employer or worker behavior
            {"\n\n"}
            Use the platform at your <Text style={{ fontWeight: "bold" }}>own risk</Text>.
        </Text>

        <Text style={styles.heading(theme)}>12. Limitation of Liability</Text>
        <Text style={styles.text(theme)}>
            To the maximum extent allowed by law:
            {"\n\n"}
            RUSH is not responsible for:
            {"\n"}   • Job loss or missed opportunities
            {"\n"}   • Fake jobs or users
            {"\n"}   • Communication issues
            {"\n"}   • Data loss or unauthorized access
            {"\n\n"}
            Our total liability (if any) will not exceed the amount you <Text style={{ fontWeight: "bold" }}>paid to us in the last 6 months</Text>.
        </Text>

        <Text style={styles.heading(theme)}>13. Account Suspension & Termination</Text>
        <Text style={styles.text(theme)}>
            • We may <Text style={{ fontWeight: "bold" }}>suspend or delete your account</Text> if you:
            {"\n"}   – Break these Terms
            {"\n"}   – Post harmful or fake content
            {"\n"}   – Misuse the platform
            {"\n\n"}
            • You can also <Text style={{ fontWeight: "bold" }}>delete your account anytime</Text>.
        </Text>

        <Text style={styles.heading(theme)}>14. Governing Law</Text>
        <Text style={styles.text(theme)}>
            • These Terms follow the <Text style={{ fontWeight: "bold" }}>laws of India</Text>.
            {"\n"}
            • Any disputes will be handled in courts located in:
            {"\n"}   – <Text style={{ fontWeight: "bold" }}>Hyderabad</Text> / Bengaluru (choose your city).
        </Text>

        <Text style={styles.heading(theme)}>15. Changes to Terms</Text>
        <Text style={styles.text(theme)}>
            • We may <Text style={{ fontWeight: "bold" }}>update these Terms anytime</Text>.
            {"\n"}
            • If you continue using RUSH, it means you <Text style={{ fontWeight: "bold" }}>accept the updated Terms</Text>.
        </Text>

        <Text style={styles.heading(theme)}>16. Contact Us</Text>
        <Text style={styles.text(theme)}>
            For support or questions:
            {"\n\n"}
            • Email: <Text style={{ fontWeight: "bold" }}>[your email]</Text>
            {"\n"}
            • Website: <Text style={{ fontWeight: "bold" }}>[your website]</Text>
            {"\n"}
            • Address: <Text style={{ fontWeight: "bold" }}>[your office address]</Text>
        </Text>

        <Text style={styles.heading(theme)}>17. Account Deletion</Text>
        <Text style={styles.text(theme)}>
            To delete your account:
            {"\n\n"}
            • <Text style={{ fontWeight: "bold" }}>Email us</Text> with your request.
            {"\n"}
            • We will process it within a <Text style={{ fontWeight: "bold" }}>reasonable time</Text>.
            {"\n"}
            • Some data may be kept if <Text style={{ fontWeight: "bold" }}>required by law</Text>.
        </Text>

      </ScrollView>

      {/* FIXED BUTTON */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 20,
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderColor: theme.border,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PHONE", {
                accepted: true,
                phone: route.params?.phone || "",
            })
            }
          style={{
            backgroundColor: theme.primary,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            I Agree
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  heading: (theme: any) => ({
    color: theme.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginTop: 15,
  }),
  text: (theme: any) => ({
    color: "#aaa",
    marginTop: 5,
    lineHeight: 20,
  }),
};