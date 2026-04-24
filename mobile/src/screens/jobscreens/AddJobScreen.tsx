// AddJobScreen.tsx

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useEmployerStore } from "../../store/employerStore";
import { useFocusEffect } from "@react-navigation/native";
import { createJob, updateJob } from "../../services/jobService";
import { jobDomains, jobRolesByDomain } from "../../data/jobTaxonomy";
import { useJobStore } from "../../store/jobStore";

import FormScreenWrapper from "../../components/FormScreenWrapper";
import SelectOptionModal from "../../components/SelectOptionModal";
import AlertModal from "../../components/AlertModal";
import Step1BasicInfo from "../../components/jobSteps/Step1BasicInfo";
import Step2Compensation from "../../components/jobSteps/Step2Compensation";
import Step3JobDetails from "../../components/jobSteps/Step3JobDetails";
import Step4Employer from "../../components/jobSteps/Step4Employer";

import { validateForm } from "../../validation/validate";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "../../validation/jobValidation";

export default function AddJobScreen({ navigation, route }: any) {
  const theme = useTheme();
  const job = route?.params?.job;

  const store = useEmployerStore();
  const { resetJobForm } = store;
  const isFirstTimeFlow = store.isFirstTimeFlow;

  const [step, setStep] = useState(1);

  // 🔥 MODAL STATES (NOW IN PARENT)
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const roles = jobRolesByDomain[store.domain] ?? [];
  const fetchJobs = useJobStore((s) => s.fetchJobs);
  

  // Reset form
  useFocusEffect(
    React.useCallback(() => {
      if (!job) resetJobForm();
    }, [job])
  );

  // Prefill edit
  useEffect(() => {
    if (job) {
      store.setTitle(job.title);
      store.setDomain(job.domain);
      store.setRole(job.role);
      store.setDescription(job.description || "");

      store.setSkills(
        Array.isArray(job.skills) ? job.skills.join(", ") : ""
      );

      store.setOpenings(job.openings);
      store.setSalary(job.salary);
      store.setPaymentFrequency(job.payment_frequency);
      store.setBenefits(job.benefits || "");

      store.setJobLocation(job.job_location);
      store.setJobPincode(job.job_pincode?.toString() || "");

      store.setWorkType(job.work_type);
      store.setShift(job.shift);
      store.setDuration(job.duration || "");

      // 🔥 CRITICAL FIX
      store.setEmployerName(job.employer_name);
      store.setContact(job.contact);

      store.setEligibility(job.eligibility || "");
      store.setTerms(job.terms || "");
      store.setVerification(job.verification || "");
    }
  }, [job]);

  // Back button handling
  useEffect(() => {
    const backAction = () => {
      if (showDomainModal) {
        setShowDomainModal(false);
        return true;
      }
      if (showRoleModal) {
        setShowRoleModal(false);
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => sub.remove();
  }, [showDomainModal, showRoleModal]);

  // Validation
  const isValid =
    store.title &&
    store.domain &&
    store.role &&
    store.openings > 0 &&
    store.salary > 0 &&
    store.jobLocation &&
    store.jobPincode.length === 6 &&
    //store.jobPincode >= 100000 &&
    //store.jobPincode <= 999999 &&
    store.workType &&
    store.shift &&
    store.employerName.trim() !== "" &&
    /^[0-9]{10}$/.test(store.contact);


  const handleNext = () => {
    let schema: any;
    let formData: any = {};

    if (step === 1) {
      schema = step1Schema;
      formData = {
        title: store.title,
        domain: store.domain,
        role: store.role,
        description: store.description,
        skills: store.skills,
        openings: store.openings,
      };
    }

    if (step === 2) {
      schema = step2Schema;
      formData = {
        salary: store.salary,
        paymentFrequency: store.paymentFrequency,
        benefits: store.benefits,
      };
    }

    if (step === 3) {
      schema = step3Schema;
      formData = {
        jobLocation: store.jobLocation,
        jobPincode: store.jobPincode,
        workType: store.workType,
        shift: store.shift,
        duration: store.duration,
      };
    }

    const validationErrors = validateForm(formData, schema);

    if (step === 3) {
      if (!store.jobPincode || store.jobPincode.length !== 6) {
        validationErrors.jobPincode = "Valid 6-digit pincode required";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log("Errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };


  

  const handleSubmit = async () => {

    if (submitting) return;

    // ✅ 1. VALIDATION FIRST (OUTSIDE TRY)
    const allSchemas = {
      ...step1Schema,
      ...step2Schema,
      ...step3Schema,
      ...step4Schema,
    };

    const formData = {
      title: store.title,
      domain: store.domain,
      role: store.role,
      description: store.description,
      skills: store.skills
        ? store.skills
            .split(/[, ]+/)
            .map((s: string) => s.trim().toLowerCase())
            .filter(Boolean)
        : [],
      openings: store.openings,

      salary: store.salary,
      paymentFrequency: store.paymentFrequency,
      benefits: store.benefits,

      jobLocation: store.jobLocation,
      jobPincode: store.jobPincode,
      workType: store.workType,
      shift: store.shift,
      duration: store.duration,

      employerName: store.employerName,
      contact: store.contact,
      eligibility: store.eligibility,
      terms: store.terms,
      verification: store.verification,
    };

    const validationErrors = validateForm(formData, allSchemas);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // ✅ 2. API LOGIC
    const payload = {
      title: store.title,
      domain: store.domain,
      role: store.role,
      description: store.description,

      skills: store.skills
        ? store.skills
            .split(/[, ]+/)
            .map((s: string) => s.trim().toLowerCase())
            .filter(Boolean)
        : [],

      openings: store.openings,
      salary: store.salary,
      payment_frequency: store.paymentFrequency,
      benefits: store.benefits,

      job_location: store.jobLocation.toLowerCase(),
      job_pincode: store.jobPincode,

      work_type: store.workType.toLowerCase(),
      shift: store.shift,
      duration: store.duration,

      employer_name: store.employerName,
      contact: store.contact,

      eligibility: store.eligibility,
      terms: store.terms,
      verification: store.verification,

      latitude: 0,
      longitude: 0,
    };

    try {
      setSubmitting(true);

      if (job) await updateJob(job.id, payload);
      else await createJob(payload);

      await fetchJobs();

      resetJobForm();

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "MAIN_TABS",
            params: {
              //screen: isFirstTimeFlow ? "DASHBOARD" : "JOBS",
              screen: "JOBS",
            },
          },
        ],
      });
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FormScreenWrapper>
        <ScrollView contentContainerStyle={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Text style={{ color: theme.text }}>
              Step {step} of 4
            </Text>
          </View>

          {step === 1 && (
            <Step1BasicInfo
              theme={theme}
              store={store}
              errors={errors}
              onOpenDomain={() => setShowDomainModal(true)}
              onOpenRole={() => {
                if (!store.domain) {
                  setAlertVisible(true);
                  return;
                }
                setShowRoleModal(true);
              }}
            />
          )}

          {step === 2 && (
            <Step2Compensation
              theme={theme}
              store={store}
              errors={errors}
            />
          )}

          {step === 3 && (
            <Step3JobDetails
              theme={theme}
              store={store}
              errors={errors}
            />
          )}

          {step === 4 && (
            <Step4Employer 
              theme={theme} 
              store={store} 
              errors={errors} 
            />
          )}
        </ScrollView>

        {/* NAVIGATION */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          {/* BACK BUTTON */}
          <View style={{ flex: 1 }}>
            {step > 1 && (
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.card, // works for light/dark
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: theme.text, fontWeight: "500" }}>
                  Back
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* NEXT / POST BUTTON */}
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            {step < 4 ? (
              <TouchableOpacity
                onPress={handleNext}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: theme.primary,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Next
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={!isValid || submitting}
                onPress={handleSubmit}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: theme.primary,
                  opacity: isValid ? 1 : 0.5,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Post Job
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </FormScreenWrapper>

      {/* 🔥 GLOBAL MODALS */}
      <SelectOptionModal
        visible={showDomainModal}
        onClose={() => setShowDomainModal(false)}
        title="Select Domain"
        options={jobDomains}
        theme={theme}
        onSelect={(val: string) => {
          store.setDomain(val);
          store.setRole("");
        }}
      />

      <SelectOptionModal
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        title="Select Role"
        options={roles}
        theme={theme}
        onSelect={(val: string) => store.setRole(val)}
      />

      <AlertModal
        visible={alertVisible}
        message="Please select a domain first"
        onClose={() => setAlertVisible(false)}
        theme={theme}
      />
    </View>
  );
}