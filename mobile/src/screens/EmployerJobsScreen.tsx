import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Pressable,
} from "react-native";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../styles/typography";
import { useNavigation } from "@react-navigation/native";
import { useEmployerStore } from "../store/employerStore";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import GlobalSafeArea from "../components/GlobalSafeArea";
import { getMyJobs, deleteJob } from "../services/jobService";
import { Alert } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppHeader from "../components/AppHeader";
import DeleteConfirmModal from "../components/DeleteConfirmModal";


type Job = {
  id: string;
  title: string;
  job_location: string;
  salary: number;
  work_type: string;
  openings: number;
  description?: string;
  status?: string;
};

type NavProp = NativeStackNavigationProp<RootStackParamList>;


export default function EmployerJobsScreen() {
  //const navigation = useNavigation<any>();
  const theme = useTheme();
  //const navigation = useNavigation<NavProp>();
  const navigation = useNavigation<any>();

  //const isFirstTimeFlow = useEmployerStore((s) => s.isFirstTimeFlow);
  //const setFirstTimeFlow = useEmployerStore((s) => s.setFirstTimeFlow);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fetchJobs = async () => {
    try {
      const res = await getMyJobs();
      setJobs(res.jobs);
    } catch (error) {
      console.log("Fetch jobs error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [])
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = (job: Job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedJob) return;

    try {
      await deleteJob(selectedJob.id);
      setShowDeleteModal(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
  <View style={{ flex: 1, backgroundColor: theme.background }}>

    {/* ✅ GLOBAL HEADER */}
    <AppHeader role="employer" />


    {/* ✅ CONTENT WRAPPER */}
    <View style={{ flex: 1, padding: 20 }}>

      {/* LOCAL HEADER */}
      {/*<View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: typography.sizes.xxxl,
            fontWeight: typography.weights.bold,
          }}
        >
          Your Posts
        </Text>

        <TouchableOpacity
          onPress={() => navigation.push("ADD_JOB")}
          style={{
            backgroundColor: theme.primary,
            width: 45,
            height: 45,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            elevation: 4,
          }}
        >
          <FontAwesome name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>*/}

      {/* JOB LIST */}
      {jobs.length === 0 ? (
        <Text style={{ color: theme.placeholder }}>
          No jobs posted yet
        </Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <JobCard
              item={item}
              theme={theme}
              handleDelete={handleDelete}
            />
          )}
        />
      )}

      {/* GO HOME (FIRST TIME FLOW ONLY) */}
      {/*{isFirstTimeFlow && (
        <TouchableOpacity
          onPress={() => {
            setFirstTimeFlow(false);
            navigation.reset({
              index: 0,
              routes: [{ name: "MAIN_TABS", params: { screen: "DASHBOARD" } }],
            });
          }}
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 12,
            backgroundColor: theme.primary,
            elevation: 3,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontWeight: typography.weights.semibold }}>
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      )}*/}
    </View>
    <DeleteConfirmModal
      visible={showDeleteModal}
      onClose={() => {
        setShowDeleteModal(false);
        setSelectedJob(null);
      }}
      onDelete={confirmDelete}
      jobTitle={selectedJob?.title}
    />
    </View>
  );
}





// ============================
// 🔥 JOB CARD COMPONENT
// ============================

const JobCard = ({ item, theme, handleDelete }: any) => {
  const navigation = useNavigation<any>();
  const scale = useRef(new Animated.Value(1)).current;

  const [expanded, setExpanded] = useState(false);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const Chip = ({ label, type = "default" }: any) => {
    let bg = theme.mode === "dark" ? "#2c2c2e" : "#f2f4f7";
    let color = theme.text;

    // ✅ status chip styling
    if (type === "status") {
      if (label === "active") {
        bg = "#e6f7ee";
        color = "#1f9d55";
      } else if (label === "closed") {
        bg = "#fdecea";
        color = "#e53935";
      } else {
        bg = "#eee";
        color = "#666";
      }
    }

    return (
      <View
        style={{
          backgroundColor: bg,
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 20,
          marginRight: 8,
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            color,
            fontSize: typography.sizes.xs,
            fontWeight: typography.weights.medium,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        marginBottom: 16,
      }}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{
          backgroundColor: theme.mode === "dark" ? "#1c1c1e" : "#ffffff",
          borderRadius: 20,
          padding: 16,

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 10,

          elevation: 6,

          borderWidth: theme.mode === "dark" ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        {/* TITLE + DELETE */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: theme.text,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <TouchableOpacity onPress={() => handleDelete(item)}>
            <FontAwesome name="trash" size={18} color="#ff4d4f" />
          </TouchableOpacity>
        </View>

        {/* LOCATION */}
        <Text
          style={{
            color: theme.placeholder,
            marginTop: 6,
            fontSize: typography.sizes.xs,
          }}
        >
          📍 {item.job_location}
        </Text>


        {/* TAGS */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          <Chip label={item.work_type} />
          <Chip label={`₹${item.salary}`} />

          <Chip
            label={
              item.openings === 1
                ? "1 opening"
                : `${item.openings} openings`
            }
          />  

          {/* 🆕 STATUS CHIP */}
          <Chip label={item.status || "active"} type="status" />
        </View>

        {/* 🆕 DESCRIPTION */}
        {item.description ? (
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ color: theme.text, fontSize: typography.sizes.xs, lineHeight: 18 }}
              numberOfLines={expanded ? undefined : 2}
            >
              {item.description}
            </Text>

            {item.description.length > 80 && (
              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text
                  style={{
                    color: theme.primary,
                    fontSize: typography.sizes.xs,
                    marginTop: 4,
                    fontWeight: typography.weights.semibold,
                  }}
                >
                  {expanded ? "Less" : "More..."}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        {/* DIVIDER */}
        <View
          style={{
            height: 1,
            backgroundColor: theme.border,
            marginVertical: 12,
            opacity: 0.4,
          }}
        />

        {/* ACTIONS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.push("ADD_JOB", { job: item })}
          >
            <Text style={{ color: theme.primary, fontWeight: typography.weights.semibold }}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("JOB_DETAILS", { job: item })}
          >
            <Text
              style={{
                color: theme.primary,
                fontWeight: typography.weights.semibold,
              }}
            >
              View Details →
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>

    
  );
};
