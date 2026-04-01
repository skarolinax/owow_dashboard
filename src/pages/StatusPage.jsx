import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function StatusPage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = screenWidth <= 1100;
  const isMobile = screenWidth <= 768;

  const progress = 52;

  const topStats = useMemo(
    () => [
      {
        label: "Timeline",
        value: (
          <>
            <span style={styles.blueNumber}>103</span>
            <span style={styles.inlineMuted}> days</span>
          </>
        ),
        sub: <span style={styles.blueSmall}>70 days remaining</span>,
      },
      {
        label: "Team",
        value: (
          <>
            <span style={styles.whiteNumber}>8</span>
            <span style={styles.inlineMuted}> members</span>
          </>
        ),
        sub: "80% capacity",
      },
      {
        label: "Tracking",
        value: <span style={styles.greenNumber}>On Track</span>,
        sub: <span style={styles.greenSmall}>Meeting all deadlines</span>,
      },
    ],
    []
  );

  const lowerStats = useMemo(
    () => [
      {
        label: "Due Date",
        value: <span style={styles.largeWhiteCenter}>05/2026</span>,
      },
      {
        label: "Tasks Done",
        value: <span style={styles.largeGreenCenter}>2/4</span>,
      },
      {
        label: "Hours Used",
        value: <span style={styles.largeWhiteCenter}>50h/100h</span>,
      },
      {
        label: "Risks",
        value: <span style={styles.largeRedCenter}>2</span>,
      },
    ],
    []
  );

  const milestones = useMemo(
    () => [
      {
        number: "1",
        title: "Project kick-off",
        description: "Project initialization complete",
        date: "1 February 2026",
        status: "Completed",
        statusType: "completed",
      },
      {
        number: "2",
        title: "Prototyping",
        description: "Wireframing and prototyping",
        date: "5 February 2026",
        status: "Completed",
        statusType: "completed",
      },
      {
        number: "3",
        title: "Development",
        description: "Development phase",
        date: "18 March 2026",
        status: "In Progress",
        statusType: "progress",
      },
      {
        number: "4",
        title: "Review and adjustment",
        description: "Refinements and delivery prep",
        date: "2 May 2026",
        status: "Upcoming",
        statusType: "upcoming",
      },
    ],
    []
  );

  return (
    <div
      style={{
        ...styles.page,
        ...(isMobile ? styles.pageMobile : {}),
      }}
    >
      <div
        style={{
          ...styles.container,
          ...(isTablet ? styles.containerTablet : {}),
          ...(isMobile ? styles.containerMobile : {}),
        }}
      >
        <div
          style={{
            ...styles.breadcrumb,
            ...(isMobile ? styles.breadcrumbMobile : {}),
          }}
        >
          <span style={styles.breadcrumbMuted}>Clients</span>
          <span style={styles.breadcrumbDivider}>&gt;</span>
          <span style={styles.breadcrumbMuted}>Nike</span>
          <span style={styles.breadcrumbDivider}>&gt;</span>
          <span style={styles.breadcrumbActive}>Dashboard Redesign</span>
        </div>

        <Link
          to="/clients"
          style={{
            ...styles.backButton,
            ...(isMobile ? styles.backButtonMobile : {}),
          }}
        >
          <span style={styles.backArrow}>←</span>
          <span>Back to Nike</span>
        </Link>

        <div
          style={{
            ...styles.badge,
            ...(isMobile ? styles.badgeMobile : {}),
          }}
        >
          <div style={styles.badgeIcon}></div>
          <div>
            <div
              style={{
                ...styles.badgeTitle,
                ...(isMobile ? styles.badgeTitleMobile : {}),
              }}
            >
              Status
            </div>
            <div
              style={{
                ...styles.badgeSub,
                ...(isMobile ? styles.badgeSubMobile : {}),
              }}
            >
              Dashboard Redesign
            </div>
          </div>
        </div>

        <div
          style={{
            ...styles.progressCard,
            ...(isMobile ? styles.progressCardMobile : {}),
          }}
        >
          <div style={styles.progressTop}>
            <div>
              <h2
                style={{
                  ...styles.progressTitle,
                  ...(isMobile ? styles.progressTitleMobile : {}),
                }}
              >
                Overall progress
              </h2>
              <p
                style={{
                  ...styles.progressSub,
                  ...(isMobile ? styles.progressSubMobile : {}),
                }}
              >
                Project is on track
              </p>
            </div>

            <div
              style={{
                ...styles.progressPercent,
                ...(isMobile ? styles.progressPercentMobile : {}),
              }}
            >
              {progress}%
            </div>
          </div>

          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        </div>

        <div
          style={{
            ...styles.topStatsGrid,
            ...(isTablet ? styles.topStatsGridTablet : {}),
            ...(isMobile ? styles.topStatsGridMobile : {}),
          }}
        >
          {topStats.map((item) => (
            <div
              key={item.label}
              style={{
                ...styles.statCard,
                ...(isMobile ? styles.statCardMobile : {}),
              }}
            >
              <div
                style={{
                  ...styles.cardLabel,
                  ...(isMobile ? styles.cardLabelMobile : {}),
                }}
              >
                ◔ {item.label}
              </div>

              <div
                style={{
                  ...styles.cardValue,
                  ...(isMobile ? styles.cardValueMobile : {}),
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  ...styles.cardSub,
                  ...(isMobile ? styles.cardSubMobile : {}),
                }}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            ...styles.lowerStatsGrid,
            ...(isMobile ? styles.lowerStatsGridMobile : {}),
          }}
        >
          {lowerStats.map((item) => (
            <div
              key={item.label}
              style={{
                ...styles.lowerCard,
                ...(isMobile ? styles.lowerCardMobile : {}),
              }}
            >
              <div
                style={{
                  ...styles.lowerLabel,
                  ...(isMobile ? styles.lowerLabelMobile : {}),
                }}
              >
                {item.label}
              </div>

              <div>{item.value}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            ...styles.milestonesHeaderWrap,
            ...(isMobile ? styles.milestonesHeaderWrapMobile : {}),
          }}
        >
          <div style={styles.milestonesHeader}>
            <span style={styles.milestonesHeaderIcon}>🎯</span>
            <span
              style={{
                ...styles.milestonesTitle,
                ...(isMobile ? styles.milestonesTitleMobile : {}),
              }}
            >
              Project Milestones
            </span>
          </div>

          <div
            style={{
              ...styles.milestonesSub,
              ...(isMobile ? styles.milestonesSubMobile : {}),
            }}
          >
            2 of 4 completed
          </div>
        </div>

        <div style={styles.milestoneList}>
          {milestones.map((milestone) => (
            <div
              key={milestone.number}
              style={{
                ...styles.milestoneCard,
                ...(isMobile ? styles.milestoneCardMobile : {}),
              }}
            >
              <div
                style={{
                  ...styles.milestoneLeft,
                  ...(isMobile ? styles.milestoneLeftMobile : {}),
                }}
              >
                <div
                  style={{
                    ...styles.milestoneNumber,
                    ...(milestone.statusType === "progress"
                      ? styles.milestoneNumberProgress
                      : {}),
                    ...(milestone.statusType === "upcoming"
                      ? styles.milestoneNumberUpcoming
                      : {}),
                    ...(isMobile ? styles.milestoneNumberMobile : {}),
                  }}
                >
                  {milestone.number}
                </div>

                <div style={styles.milestoneTextWrap}>
                  <div
                    style={{
                      ...styles.milestoneTitle,
                      ...(isMobile ? styles.milestoneTitleMobile : {}),
                    }}
                  >
                    {milestone.title}
                  </div>

                  <div
                    style={{
                      ...styles.milestoneDescription,
                      ...(isMobile ? styles.milestoneDescriptionMobile : {}),
                    }}
                  >
                    {milestone.description}
                  </div>

                  <div
                    style={{
                      ...styles.milestoneDate,
                      ...(isMobile ? styles.milestoneDateMobile : {}),
                    }}
                  >
                    ▦ {milestone.date}
                  </div>
                </div>
              </div>

              <div
                style={{
                  ...styles.statusPill,
                  ...(milestone.statusType === "completed"
                    ? styles.statusPillCompleted
                    : {}),
                  ...(milestone.statusType === "progress"
                    ? styles.statusPillProgress
                    : {}),
                  ...(milestone.statusType === "upcoming"
                    ? styles.statusPillUpcoming
                    : {}),
                  ...(isMobile ? styles.statusPillMobile : {}),
                }}
              >
                {milestone.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    color: "#ffffff",
    fontFamily: "Montreal",
    padding: "20px 18px 28px",
    boxSizing: "border-box",
  },

  pageMobile: {
    padding: "16px 12px 22px",
  },

  container: {
    width: "100%",
    maxWidth: "920px",
    margin: "0 auto",
  },

  containerTablet: {
    maxWidth: "860px",
  },

  containerMobile: {
    maxWidth: "100%",
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
    marginBottom: "18px",
    fontFamily: "MontrealMono",
  },

  breadcrumbMobile: {
    fontSize: "12px",
    gap: "5px",
    marginBottom: "12px",
    flexWrap: "wrap",
  },

  breadcrumbMuted: {
    color: "#7A7A81",
  },

  breadcrumbDivider: {
    color: "#7A7A81",
  },

  breadcrumbActive: {
    color: "#EDEDED",
  },

  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid #242426",
    backgroundColor: "#121214",
    color: "#d7d7db",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "14px",
    marginBottom: "18px",
  },

  backButtonMobile: {
    padding: "10px 14px",
    fontSize: "13px",
    marginBottom: "14px",
  },

  backArrow: {
    fontSize: "18px",
    lineHeight: 1,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    background:
      "linear-gradient(180deg, rgba(4,33,18,1) 0%, rgba(4,24,14,1) 100%)",
    borderRadius: "12px",
    padding: "12px 18px",
    marginBottom: "14px",
  },

  badgeMobile: {
    padding: "10px 12px",
    gap: "8px",
    borderRadius: "10px",
    marginBottom: "12px",
  },

  badgeIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    background:
      "linear-gradient(180deg, #bff7ff 0%, #9ee8c0 30%, #ff90ce 65%, #fff4a7 100%)",
  },

  badgeTitle: {
    fontSize: "28px",
    lineHeight: 1,
    marginBottom: "4px",
  },

  badgeTitleMobile: {
    fontSize: "20px",
    marginBottom: "3px",
  },

  badgeSub: {
    fontSize: "13px",
    color: "#6d7c70",
    fontFamily: "MontrealMono",
  },

  badgeSubMobile: {
    fontSize: "11px",
  },

  progressCard: {
    background: "#171719",
    border: "1px solid #242426",
    borderRadius: "8px",
    padding: "22px 24px",
    marginBottom: "16px",
  },

  progressCardMobile: {
    padding: "16px 14px",
    marginBottom: "12px",
  },

  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "18px",
  },

  progressTitle: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 500,
    lineHeight: 1,
  },

  progressTitleMobile: {
    fontSize: "24px",
  },

  progressSub: {
    margin: "8px 0 0 0",
    color: "#22a652",
    fontSize: "14px",
    fontFamily: "MontrealMono",
  },

  progressSubMobile: {
    fontSize: "12px",
    marginTop: "6px",
  },

  progressPercent: {
    fontSize: "48px",
    lineHeight: 1,
    fontWeight: 500,
    color: "#22a652",
    whiteSpace: "nowrap",
  },

  progressPercentMobile: {
    fontSize: "32px",
  },

  progressTrack: {
    width: "100%",
    height: "12px",
    borderRadius: "999px",
    backgroundColor: "#2A2A2F",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #31ba62 0%, #2fa959 100%)",
  },

  topStatsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "12px",
  },

  topStatsGridTablet: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },

  topStatsGridMobile: {
    gridTemplateColumns: "1fr",
    gap: "8px",
    marginBottom: "8px",
  },

  statCard: {
    background: "#171719",
    border: "1px solid #242426",
    borderRadius: "8px",
    padding: "18px 18px",
    minHeight: "130px",
    boxSizing: "border-box",
  },

  statCardMobile: {
    minHeight: "unset",
    padding: "14px 14px",
  },

  cardLabel: {
    color: "#7A7A81",
    fontFamily: "MontrealMono",
    fontSize: "14px",
    marginBottom: "18px",
  },

  cardLabelMobile: {
    fontSize: "12px",
    marginBottom: "12px",
  },

  cardValue: {
    fontSize: "20px",
    marginBottom: "14px",
  },

  cardValueMobile: {
    fontSize: "18px",
    marginBottom: "8px",
  },

  cardSub: {
    color: "#7A7A81",
    fontFamily: "MontrealMono",
    fontSize: "14px",
  },

  cardSubMobile: {
    fontSize: "12px",
  },

  inlineMuted: {
    color: "#7A7A81",
    fontFamily: "MontrealMono",
    fontSize: "14px",
  },

  blueNumber: {
    color: "#1e8fff",
    fontSize: "40px",
    lineHeight: 1,
    fontWeight: 500,
  },

  blueSmall: {
    color: "#1e8fff",
    fontFamily: "MontrealMono",
    fontSize: "14px",
  },

  whiteNumber: {
    color: "#F4F4F6",
    fontSize: "40px",
    lineHeight: 1,
    fontWeight: 500,
  },

  greenNumber: {
    color: "#22a652",
    fontSize: "38px",
    lineHeight: 1,
    fontWeight: 500,
  },

  greenSmall: {
    color: "#22a652",
    fontFamily: "MontrealMono",
    fontSize: "14px",
  },

  lowerStatsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },

  lowerStatsGridMobile: {
    gridTemplateColumns: "1fr",
    gap: "8px",
    marginBottom: "16px",
  },

  lowerCard: {
    background: "#171719",
    border: "1px solid #242426",
    borderRadius: "8px",
    padding: "18px 18px",
    minHeight: "110px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  lowerCardMobile: {
    minHeight: "unset",
    padding: "14px 14px",
  },

  lowerLabel: {
    color: "#7A7A81",
    fontFamily: "MontrealMono",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "12px",
  },

  lowerLabelMobile: {
    fontSize: "12px",
    marginBottom: "8px",
  },

  largeWhiteCenter: {
    display: "block",
    textAlign: "center",
    color: "#F4F4F6",
    fontSize: "36px",
    lineHeight: 1,
    fontWeight: 500,
  },

  largeGreenCenter: {
    display: "block",
    textAlign: "center",
    color: "#22a652",
    fontSize: "36px",
    lineHeight: 1,
    fontWeight: 500,
  },

  largeRedCenter: {
    display: "block",
    textAlign: "center",
    color: "#ff4f43",
    fontSize: "36px",
    lineHeight: 1,
    fontWeight: 500,
  },

  milestonesHeaderWrap: {
    marginBottom: "12px",
  },

  milestonesHeaderWrapMobile: {
    marginBottom: "10px",
  },

  milestonesHeader: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 16px",
    borderRadius: "14px",
    backgroundColor: "#0f1014",
    marginBottom: "10px",
  },

  milestonesHeaderIcon: {
    fontSize: "16px",
  },

  milestonesTitle: {
    fontSize: "17px",
    fontWeight: 500,
  },

  milestonesTitleMobile: {
    fontSize: "15px",
  },

  milestonesSub: {
    color: "#7A7A81",
    fontFamily: "MontrealMono",
    fontSize: "14px",
  },

  milestonesSubMobile: {
    fontSize: "12px",
  },

  milestoneList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  milestoneCard: {
    background: "#171719",
    border: "1px solid #242426",
    borderRadius: "8px",
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },

  milestoneCardMobile: {
    padding: "14px 12px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
  },

  milestoneLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    minWidth: 0,
  },

  milestoneLeftMobile: {
    alignItems: "flex-start",
    gap: "10px",
  },

  milestoneNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34,166,82,0.16)",
    color: "#22a652",
    fontFamily: "MontrealMono",
    fontSize: "18px",
    flexShrink: 0,
  },

  milestoneNumberProgress: {
    backgroundColor: "rgba(228,154,47,0.18)",
    color: "#e49a2f",
  },

  milestoneNumberUpcoming: {
    backgroundColor: "rgba(100,100,110,0.12)",
    color: "#7A7A81",
  },

  milestoneNumberMobile: {
    width: "36px",
    height: "36px",
    fontSize: "16px",
    borderRadius: "12px",
  },

  milestoneTextWrap: {
    minWidth: 0,
  },

  milestoneTitle: {
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "4px",
  },

  milestoneTitleMobile: {
    fontSize: "14px",
  },

  milestoneDescription: {
    color: "#7A7A81",
    fontFamily: "MontrealMono",
    fontSize: "13px",
    marginBottom: "6px",
  },

  milestoneDescriptionMobile: {
    fontSize: "12px",
    lineHeight: 1.5,
  },

  milestoneDate: {
    color: "#7A7A81",
    fontFamily: "MontrealMono",
    fontSize: "12px",
  },

  milestoneDateMobile: {
    fontSize: "11px",
  },

  statusPill: {
    padding: "10px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontFamily: "MontrealMono",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  statusPillCompleted: {
    backgroundColor: "rgba(34,166,82,0.16)",
    color: "#22a652",
  },

  statusPillProgress: {
    backgroundColor: "rgba(228,154,47,0.18)",
    color: "#e49a2f",
  },

  statusPillUpcoming: {
    backgroundColor: "rgba(100,100,110,0.14)",
    color: "#8f8f95",
  },

  statusPillMobile: {
    fontSize: "11px",
    padding: "8px 10px",
  },
};

export default StatusPage;