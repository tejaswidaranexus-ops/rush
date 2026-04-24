import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useAuthStore } from "../../store/authStore";
import { deleteJob } from "../../services/jobService";
import { createStyles } from "../../styles/JobDetails.styles";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

export default function JobDetailsScreen({ route, navigation }: any) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const { job } = route.params;
  const user = useAuthStore((s) => s.user);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isJobSeeker = user?.role === "jobseeker";
  const isEmployer = user?.role === "employer";
  const isOwner = job.employer_id === user?.id;

  /* ---------------- HANDLERS ---------------- */

  const handleApply = () => {
    Alert.alert("Applied", "You have applied for this job");
  };

  const handleEdit = () => {
    navigation.navigate("ADD_JOB", { job });
  };



  const confirmDelete = async () => {
    try {
      await deleteJob(job.id);
      setShowDeleteModal(false);
      navigation.goBack();
    } catch {
      Alert.alert("Error", "Failed to delete job");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>{job.title}</Text>

          <Text style={styles.location}>
            📍 {job.job_location} • {job.job_pincode}
          </Text>

          <Text style={styles.salary}>
            ₹ {job.salary} / {job.payment_frequency}
          </Text>
        </View>

        {/* TAGS */}
        <View style={styles.tagContainer}>
          <Chip text={job.domain} />
          <Chip text={job.role} />
          <Chip text={job.work_type} />
          <Chip text={job.shift} />
        </View>

        {/* JOB OVERVIEW */}
        <Card title="Job Overview">
          <Item label="Openings" value={job.openings} />
          <Item label="Duration" value={job.duration || "Not specified"} />
          <Item label="Payment" value={job.payment_frequency} />
        </Card>

        {/* DESCRIPTION */}
        {job.description && (
          <Card title="Job Description">
            <Text style={[styles.itemText, styles.descriptionText]}>
              {job.description}
            </Text>
          </Card>
        )}

        {/* SKILLS */}
        {job.skills?.length > 0 && (
          <Card title="Required Skills">
            <View style={styles.tagContainer}>
              {job.skills.map((s: string, i: number) => (
                <Chip key={i} text={s} small />
              ))}
            </View>
          </Card>
        )}

        {/* BENEFITS */}
        {job.benefits && (
          <Card title="Benefits">
            <Text style={styles.itemText}>{job.benefits}</Text>
          </Card>
        )}

        {/* ELIGIBILITY */}
        {job.eligibility && (
          <Card title="Eligibility">
            <Text style={styles.itemText}>{job.eligibility}</Text>
          </Card>
        )}

        {/* TERMS */}
        {job.terms && (
          <Card title="Terms & Conditions">
            <Text style={styles.itemText}>{job.terms}</Text>
          </Card>
        )}

        {/* EMPLOYER */}
        <Card title="Employer Details">
          <Item label="Company" value={job.employer_name} />
          <Item label="Contact" value={job.contact} />
          {job.verification && (
            <Item label="Verification" value={job.verification} />
          )}
        </Card>
      </ScrollView>

      {/* CTA */}
      <View style={styles.ctaContainer}>
        {isJobSeeker && (
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
            onPress={handleApply}
          >
            <Text style={styles.btnText}>Apply Now</Text>
          </TouchableOpacity>
        )}

        {isEmployer && isOwner && (
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.primaryBtn,
                { flex: 1, marginRight: 10, backgroundColor: theme.primary },
              ]}
              onPress={handleEdit}
            >
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dangerBtn, { flex: 1 }]}
              onPress={() => setShowDeleteModal(true)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ✅ ADD MODAL HERE */}
      <DeleteConfirmModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
        jobTitle={job.title}
      />
    </View>
  );
}

/* ---------- COMPONENTS ---------- */

const Card = ({ title, children }: any) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
};

const Item = ({ label, value }: any) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Text style={styles.itemText}>
      {label}: <Text style={styles.itemValue}>{value}</Text>
    </Text>
  );
};

const Chip = ({ text, small }: any) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View
      style={[
        styles.chip,
        small && styles.chipSmall,
        { borderColor: theme.border },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          small && styles.chipTextSmall,
          { color: theme.text },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};