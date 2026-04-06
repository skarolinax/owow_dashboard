import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import arrowRight from "../assets/images/arrow-right.svg";
import clients from "../data/clients.json";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isForgotHovered, setIsForgotHovered] = useState(false);
  const [isEmployeeHovered, setIsEmployeeHovered] = useState(false);
  const [isClientHovered, setIsClientHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const isMobile = screenWidth <= 768;
  const isTablet = screenWidth <= 1100;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const finalHeading = "Welcome Back!";
  const scrambleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=<>?/0123456789";
  const [displayHeading, setDisplayHeading] = useState(finalHeading);
  const scrambleIntervalRef = useRef(null);

  const runScrambleAnimation = () => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }

    let iteration = 0;

    scrambleIntervalRef.current = setInterval(() => {
      const nextText = finalHeading
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return finalHeading[index];
          const randomIndex = Math.floor(Math.random() * scrambleChars.length);
          return scrambleChars[randomIndex];
        })
        .join("");

      setDisplayHeading(nextText);

      iteration += 1 / 2.2;

      if (iteration >= finalHeading.length) {
        clearInterval(scrambleIntervalRef.current);
        setDisplayHeading(finalHeading);
      }
    }, 45);
  };

  useEffect(() => {
    runScrambleAnimation();

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const client = clients.find((c) => c.name === "Nike");

    localStorage.setItem("owowRole", role);

    if (role === "client") {
      localStorage.setItem("owowClient", JSON.stringify(client));
      navigate("/projects-overview", { state: { client, role } });
    } else {
      localStorage.removeItem("owowClient");
      navigate("/clients");
    }
  };

  const getRoleButtonStyle = (buttonRole, isHovered) => {
    const isActive = role === buttonRole;

    if (buttonRole === "employee") {
      return {
        ...styles.roleButton,
        ...(isMobile ? styles.roleButtonMobile : {}),
        ...(isActive ? styles.roleButtonEmployeeActive : {}),
        ...(isHovered && !isActive ? styles.roleButtonHover : {}),
      };
    }

    return {
      ...styles.roleButton,
      ...(isMobile ? styles.roleButtonMobile : {}),
      ...(isActive ? styles.roleButtonClientActive : {}),
      ...(isHovered && !isActive ? styles.roleButtonClientHover : {}),
    };
  };

  return (
    <div
      style={{
        ...styles.page,
        ...(isMobile ? styles.pageMobile : {}),
      }}
    >
      <div
        style={{
          ...styles.wrapper,
          ...(isTablet ? styles.wrapperTablet : {}),
          ...(isMobile ? styles.wrapperMobile : {}),
        }}
      >
        <div
          style={{
            ...styles.leftPanel,
            ...(isTablet ? styles.leftPanelTablet : {}),
            ...(isMobile ? styles.leftPanelMobile : {}),
          }}
        >
          <img
            src={logo}
            alt="OWOW logo"
            style={{
              ...styles.logo,
              ...(isTablet ? styles.logoTablet : {}),
              ...(isMobile ? styles.logoMobile : {}),
            }}
          />

          <div
            style={{
              ...styles.leftContent,
              ...(isMobile ? styles.leftContentMobile : {}),
            }}
          >
            <h1
              style={{
                ...styles.heading,
                ...(isTablet ? styles.headingTablet : {}),
                ...(isMobile ? styles.headingMobile : {}),
              }}
              onMouseEnter={runScrambleAnimation}
            >
              {displayHeading}
            </h1>

            <p
              style={{
                ...styles.subText,
                ...(isTablet ? styles.subTextTablet : {}),
                ...(isMobile ? styles.subTextMobile : {}),
              }}
            >
              Enter your email and password to access your account
            </p>

            <form style={styles.form} onSubmit={handleLogin}>
              <div
                style={{
                  ...styles.fieldGroup,
                  ...(isMobile ? styles.fieldGroupMobile : {}),
                }}
              >
                <label
                  style={{
                    ...styles.label,
                    ...(isMobile ? styles.labelMobile : {}),
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="imyourclient@owow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    ...styles.input,
                    ...(isTablet ? styles.inputTablet : {}),
                    ...(isMobile ? styles.inputMobile : {}),
                  }}
                />
              </div>

              <div
                style={{
                  ...styles.fieldGroup,
                  ...(isMobile ? styles.fieldGroupMobile : {}),
                }}
              >
                <label
                  style={{
                    ...styles.label,
                    ...(isMobile ? styles.labelMobile : {}),
                  }}
                >
                  Password
                </label>

                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="***********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      ...styles.passwordInput,
                      ...(isTablet ? styles.inputTablet : {}),
                      ...(isMobile ? styles.inputMobile : {}),
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                    aria-label="Toggle password visibility"
                  >
                    <svg
                      width={isMobile ? "20" : "22"}
                      height={isMobile ? "20" : "22"}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6F6F76"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                style={{
                  ...styles.optionsRow,
                  ...(isMobile ? styles.optionsRowMobile : {}),
                }}
              >
                <label
                  style={{
                    ...styles.checkboxLabel,
                    ...(isMobile ? styles.checkboxLabelMobile : {}),
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    style={{
                      ...styles.checkbox,
                      ...(isMobile ? styles.checkboxMobile : {}),
                    }}
                  />
                  Remember Me
                </label>

                <button
                  type="button"
                  onMouseEnter={() => setIsForgotHovered(true)}
                  onMouseLeave={() => setIsForgotHovered(false)}
                  style={{
                    ...styles.linkButton,
                    ...(isMobile ? styles.linkButtonMobile : {}),
                    ...(isForgotHovered ? styles.linkButtonHover : {}),
                  }}
                >
                  Forgot Your Password?
                </button>
              </div>

              <div
                style={{
                  ...styles.roleSwitch,
                  ...(isMobile ? styles.roleSwitchMobile : {}),
                }}
              >
                <button
                  type="button"
                  onClick={() => setRole("employee")}
                  onMouseEnter={() => setIsEmployeeHovered(true)}
                  onMouseLeave={() => setIsEmployeeHovered(false)}
                  style={getRoleButtonStyle("employee", isEmployeeHovered)}
                >
                  <span style={styles.roleIcon}>
                    <svg
                      width={isMobile ? "14" : "16"}
                      height={isMobile ? "14" : "16"}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={role === "employee" ? "#111111" : "#7A7A81"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="10" cy="7" r="4" />
                      <path d="M20 8v6" />
                      <path d="M23 11h-6" />
                    </svg>
                  </span>
                  Employee
                </button>

                <button
                  type="button"
                  onClick={() => setRole("client")}
                  onMouseEnter={() => setIsClientHovered(true)}
                  onMouseLeave={() => setIsClientHovered(false)}
                  style={getRoleButtonStyle("client", isClientHovered)}
                >
                  <span style={styles.roleIcon}>
                    <svg
                      width={isMobile ? "14" : "16"}
                      height={isMobile ? "14" : "16"}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={role === "client" ? "#111111" : "#7A7A81"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  Client
                </button>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
                style={{
                  ...styles.loginButton,
                  ...(isMobile ? styles.loginButtonMobile : {}),
                  ...(isLoginHovered ? styles.loginButtonHover : {}),
                }}
              >
                <span>Log in</span>
                <img
                  src={arrowRight}
                  alt=""
                  style={{
                    ...styles.arrowIcon,
                    ...(isMobile ? styles.arrowIconMobile : {}),
                    ...(isLoginHovered ? styles.arrowIconHover : {}),
                  }}
                />
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            ...styles.rightPanel,
            ...(isTablet ? styles.rightPanelTablet : {}),
            ...(isMobile ? styles.rightPanelMobile : {}),
          }}
        >
          <div
            style={{
              ...styles.orangeGlow,
              ...(isMobile ? styles.orangeGlowMobile : {}),
            }}
          ></div>
          <div
            style={{
              ...styles.greenGlow,
              ...(isMobile ? styles.greenGlowMobile : {}),
            }}
          ></div>
          <div
            style={{
              ...styles.blueGlow,
              ...(isMobile ? styles.blueGlowMobile : {}),
            }}
          ></div>

          <div
            style={{
              ...styles.rightContent,
              ...(isMobile ? styles.rightContentMobile : {}),
            }}
          >
            <h2
              style={{
                ...styles.rightHeading,
                ...(isTablet ? styles.rightHeadingTablet : {}),
                ...(isMobile ? styles.rightHeadingMobile : {}),
              }}
            >
              Easily manage all client projects.
            </h2>

            <p
              style={{
                ...styles.rightSubText,
                ...(isTablet ? styles.rightSubTextTablet : {}),
                ...(isMobile ? styles.rightSubTextMobile : {}),
              }}
            >
              Log in to access dashboards, budgets, risks, and team performance.
            </p>

            <div
              style={{
                ...styles.cards,
                ...(isMobile ? styles.cardsMobile : {}),
              }}
            >
              <FeatureCard
                id="analytics"
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                isMobile={isMobile}
                bg="rgba(228, 154, 47, 0.12)"
                title="Real-time Analytics"
                description="Track progress and KPIs live"
                icon={
                  <svg
                    width={isMobile ? "20" : "22"}
                    height={isMobile ? "20" : "22"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E49A2F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="20" x2="12" y2="10" />
                    <line x1="18" y1="20" x2="18" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="16" />
                  </svg>
                }
              />

              <FeatureCard
                id="management"
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                isMobile={isMobile}
                bg="rgba(20, 151, 86, 0.12)"
                title="Project Management"
                description="All projects in one dashboard"
                icon={
                  <svg
                    width={isMobile ? "20" : "22"}
                    height={isMobile ? "20" : "22"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#149756"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                  </svg>
                }
              />

              <FeatureCard
                id="risks"
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                isMobile={isMobile}
                bg="rgba(225, 90, 61, 0.12)"
                title="Risk Assessment"
                description="Identify & mitigate risks early"
                icon={
                  <svg
                    width={isMobile ? "20" : "22"}
                    height={isMobile ? "20" : "22"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E15A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  id,
  icon,
  title,
  description,
  bg,
  isMobile,
  hoveredCard,
  setHoveredCard,
}) {
  const isHovered = hoveredCard === id;

  return (
    <div
      onMouseEnter={() => setHoveredCard(id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        ...styles.featureCard,
        ...(isMobile ? styles.featureCardMobile : {}),
        ...(isHovered ? styles.featureCardHover : {}),
      }}
    >
      <div
        style={{
          ...styles.featureIconBox,
          backgroundColor: bg,
          ...(isMobile ? styles.featureIconBoxMobile : {}),
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          style={{
            ...styles.featureTitle,
            ...(isMobile ? styles.featureTitleMobile : {}),
          }}
        >
          {title}
        </h3>
        <p
          style={{
            ...styles.featureDescription,
            ...(isMobile ? styles.featureDescriptionMobile : {}),
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Montreal",
    color: "#ffffff",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
  },

  pageMobile: {
    minHeight: "100vh",
    height: "auto",
    padding: "16px",
    overflow: "visible",
  },

  wrapper: {
    display: "grid",
    gridTemplateColumns: "1.04fr 0.96fr",
    width: "100%",
    maxWidth: "1680px",
    minHeight: "calc(100vh - 40px)",
    gap: "28px",
    alignItems: "stretch",
  },

  wrapperTablet: {
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    minHeight: "calc(100vh - 40px)",
  },

  wrapperMobile: {
    gridTemplateColumns: "1fr",
    minHeight: "auto",
    height: "auto",
    gap: "16px",
  },

  leftPanel: {
    backgroundColor: "#000000",
    padding: "34px 32px 26px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  leftPanelTablet: {
    padding: "28px 20px 20px 20px",
  },

  leftPanelMobile: {
    padding: "10px 4px 0 4px",
  },

logo: {
  width: "128px",
  height: "auto",
  display: "block",
  marginBottom: "56px",
  filter: "brightness(0) invert(1) contrast(1.2)",
},

  logoTablet: {
    width: "118px",
    marginBottom: "42px",
  },

  logoMobile: {
    width: "108px",
    marginBottom: "34px",
  },

  leftContent: {
    width: "100%",
    maxWidth: "520px",
  },

  leftContentMobile: {
    maxWidth: "100%",
  },

  heading: {
    fontSize: "54px",
    lineHeight: 1.02,
    margin: "0 0 18px 0",
    fontWeight: 500,
    letterSpacing: "-1.4px",
    minHeight: "64px",
    cursor: "default",
    userSelect: "none",
  },

  headingTablet: {
    fontSize: "46px",
    minHeight: "54px",
  },

  headingMobile: {
    fontSize: "42px",
    minHeight: "48px",
    margin: "0 0 14px 0",
    letterSpacing: "-1px",
  },

  subText: {
    color: "#7B7B82",
    fontSize: "16px",
    lineHeight: 1.5,
    marginBottom: "38px",
    maxWidth: "430px",
    fontFamily: "MontrealMono",
  },

  subTextTablet: {
    fontSize: "15px",
    marginBottom: "34px",
    maxWidth: "390px",
  },

  subTextMobile: {
    fontSize: "14px",
    lineHeight: 1.55,
    marginBottom: "28px",
    maxWidth: "100%",
  },

  form: {
    width: "100%",
  },

  fieldGroup: {
    marginBottom: "16px",
  },

  fieldGroupMobile: {
    marginBottom: "14px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: 500,
    color: "#ffffff",
  },

  labelMobile: {
    fontSize: "15px",
    marginBottom: "7px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#0B0B0C",
    color: "#8B8B92",
    border: "1px solid #242426",
    borderRadius: "4px",
    padding: "16px 18px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "MontrealMono",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
  },

  inputTablet: {
    padding: "15px 16px",
    fontSize: "13px",
  },

  inputMobile: {
    padding: "14px 15px",
    fontSize: "13px",
  },

  passwordWrapper: {
    position: "relative",
  },

  passwordInput: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#0B0B0C",
    color: "#8B8B92",
    border: "1px solid #242426",
    borderRadius: "4px",
    padding: "16px 50px 16px 18px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "MontrealMono",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
  },

  eyeButton: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  },

  optionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    marginBottom: "14px",
    gap: "12px",
    flexWrap: "wrap",
  },

  optionsRowMobile: {
    alignItems: "flex-start",
    marginTop: "6px",
    marginBottom: "12px",
    gap: "10px",
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#B3B3B8",
    cursor: "pointer",
  },

  checkboxLabelMobile: {
    fontSize: "13px",
    gap: "8px",
  },

  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#ffffff",
  },

  checkboxMobile: {
    width: "15px",
    height: "15px",
  },

  linkButton: {
    background: "none",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "14px",
    padding: 0,
    fontFamily: "Montreal",
    transition: "opacity 0.2s ease, transform 0.2s ease, color 0.2s ease",
  },

  linkButtonMobile: {
    fontSize: "13px",
  },

  linkButtonHover: {
    color: "#E49A2F",
    transform: "translateY(-1px)",
  },

  roleSwitch: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    border: "1px solid #242426",
    borderRadius: "4px",
    overflow: "hidden",
    backgroundColor: "#0B0B0C",
    marginBottom: "16px",
  },

  roleSwitchMobile: {
    marginBottom: "14px",
  },

  roleButton: {
    backgroundColor: "transparent",
    color: "#7B7B82",
    border: "none",
    padding: "14px 16px",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "Montreal",
    transition: "all 0.22s ease",
  },

  roleButtonMobile: {
    padding: "13px 12px",
    fontSize: "14px",
    gap: "8px",
  },

  roleButtonEmployeeActive: {
    backgroundColor: "#F3F3F3",
    color: "#101010",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
  },

  roleButtonClientActive: {
    backgroundColor: "#E49A2F",
    color: "#101010",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
  },

  roleButtonHover: {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#F3F3F3",
  },

  roleButtonClientHover: {
    backgroundColor: "rgba(228, 154, 47, 0.18)",
    color: "#F3F3F3",
  },

  roleIcon: {
    display: "flex",
    alignItems: "center",
  },

  loginButton: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    color: "#101010",
    border: "none",
    borderRadius: "4px",
    padding: "18px 22px",
    fontSize: "17px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "Montreal",
    transition: "transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease",
  },

  loginButtonMobile: {
    padding: "16px 18px",
    fontSize: "16px",
    gap: "8px",
  },

  loginButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 14px 30px rgba(255,255,255,0.08)",
    filter: "brightness(0.96)",
  },

  arrowIcon: {
    width: "16px",
    height: "16px",
    transition: "transform 0.22s ease",
  },

  arrowIconMobile: {
    width: "14px",
    height: "14px",
  },

  arrowIconHover: {
    transform: "translateX(4px)",
  },

  rightPanel: {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #171719 0%, #1C1C1F 100%)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "2px",
    padding: "40px 34px 26px 34px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    boxSizing: "border-box",
    minHeight: "100%",
  },

  rightPanelTablet: {
    padding: "30px 22px 20px 22px",
  },

  rightPanelMobile: {
    minHeight: "auto",
    padding: "28px 18px 18px 18px",
    height: "auto",
  },

  rightContent: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "600px",
  },

  rightContentMobile: {
    maxWidth: "100%",
  },

  rightHeading: {
    fontSize: "50px",
    lineHeight: 1.06,
    letterSpacing: "-1.3px",
    fontWeight: 500,
    margin: "0 0 18px 0",
    maxWidth: "500px",
  },

  rightHeadingTablet: {
    fontSize: "42px",
    maxWidth: "420px",
  },

  rightHeadingMobile: {
    fontSize: "34px",
    lineHeight: 1.08,
    margin: "0 0 16px 0",
    maxWidth: "100%",
    letterSpacing: "-1px",
  },

  rightSubText: {
    fontSize: "16px",
    color: "#8A8A91",
    lineHeight: 1.6,
    marginBottom: "44px",
    maxWidth: "540px",
    fontFamily: "MontrealMono",
  },

  rightSubTextTablet: {
    fontSize: "15px",
    marginBottom: "34px",
    maxWidth: "100%",
  },

  rightSubTextMobile: {
    fontSize: "14px",
    lineHeight: 1.6,
    marginBottom: "24px",
    maxWidth: "100%",
  },

  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "100%",
  },

  cardsMobile: {
    gap: "8px",
  },

  featureCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "16px 16px",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
    transition: "transform 0.22s ease, border-color 0.22s ease, background 0.22s ease",
  },

  featureCardMobile: {
    padding: "14px 14px",
    gap: "12px",
  },

  featureCardHover: {
    transform: "translateY(-2px)",
    background: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.14)",
  },

  featureIconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  featureIconBoxMobile: {
    width: "36px",
    height: "36px",
  },

  featureTitle: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    fontWeight: 500,
    color: "#ffffff",
  },

  featureTitleMobile: {
    fontSize: "15px",
  },

  featureDescription: {
    margin: 0,
    color: "#8A8A91",
    fontSize: "14px",
    fontFamily: "MontrealMono",
  },

  featureDescriptionMobile: {
    fontSize: "13px",
    lineHeight: 1.5,
  },

  orangeGlow: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(232, 150, 39, 0.08)",
    top: "-44px",
    right: "-34px",
    zIndex: 1,
  },

  orangeGlowMobile: {
    width: "180px",
    height: "180px",
    top: "-30px",
    right: "-40px",
  },

  greenGlow: {
    position: "absolute",
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    background: "rgba(20, 151, 86, 0.06)",
    top: "205px",
    right: "150px",
    zIndex: 1,
  },

  greenGlowMobile: {
    width: "120px",
    height: "120px",
    top: "150px",
    right: "30px",
  },

  blueGlow: {
    position: "absolute",
    width: "290px",
    height: "290px",
    borderRadius: "50%",
    background: "rgba(29, 78, 216, 0.08)",
    bottom: "-100px",
    left: "-70px",
    zIndex: 1,
  },

  blueGlowMobile: {
    width: "200px",
    height: "200px",
    bottom: "-90px",
    left: "-80px",
  },
};

export default LoginPage;