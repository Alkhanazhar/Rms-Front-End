import { jwtDecode } from "jwt-decode";
import {
  BaggageClaim,
  Book,
  Factory,
  Grid2x2Check,
  LogOut,
  ShieldMinus,
  User2,
  UserIcon,
  Users,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userInfo = token && jwtDecode(token);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const navLinks = {
    SUPER_ADMIN: [
      {
        path: "/superadmin",
        name: "Dashboard",
        icon: (
          <Grid2x2Check
            className={`dashboard-links cursor-pointer ${
              location.pathname === "/superadmin" ? "text-yellow" : "text-white"
            } `}
          />
        ),
      },
      {
        path: "/superadmin/users",
        name: "School",
        icon: (
          <User2
            className={`dashboard-links cursor-pointer ${
              location.pathname === "/superadmin/users"
                ? "text-yellow"
                : "text-white"
            } `}
          />
        ),
      },
      {
        path: "/superadmin/jobs",
        name: "School",
        icon: (
          <BaggageClaim
            className={`dashboard-links cursor-pointer ${
              location.pathname === "/superadmin/jobs"
                ? "text-yellow"
                : "text-white"
            } `}
          />
        ),
      },
      {
        path: "/superadmin/company",
        name: "School",
        icon: (
          <Factory
            className={`dashboard-links cursor-pointer ${
              location.pathname === "/superadmin/company"
                ? "text-yellow"
                : "text-white"
            } `}
          />
        ),
      },
    ],
    ADMIN: [
      {
        path: "/admin",
        name: "Dashboard",
        icon: <ShieldMinus className="icon-size" />,
      },
      {
        path: "/admin/sub-admin",
        name: "Sub-admin",
        icon: <UserIcon className="icon-size" />,
      },
      {
        path: "/admin/teachers",
        name: "Teachers",
        icon: <Users className="icon-size" />,
      },
      {
        path: "/admin/students",
        name: "Students",
        icon: <User2 strokeWidth={2} className="icon-size" />,
      },
      {
        path: "/admin/courses",
        name: "Courses",
        icon: <Book className="icon-size" />,
      },
    ],
    RECRIUTMENT_DASHBOARD: [
      {
        path: "/teacher",
        name: "Dashboard",
        icon: <ShieldMinus className="icon-size" />,
      },
      {
        path: "/teacher/courses",
        name: "Courses",
        icon: <Book className="icon-size" />,
      },
      {
        path: "/teacher/students",
        name: "Students",
        icon: <Users className="icon-size" />,
      },
    ],
    USER: [
      {
        path:
          userInfo?.claims?.type == "EXTERNAL"
            ? "/external-student"
            : "/student",
        name: "Dashboard",
        icon: <ShieldMinus className="icon-size" />,
      },
      {
        path:
          userInfo?.claims?.type == "EXTERNAL"
            ? "/external-student/courses"
            : "/student/courses",
        name: "Courses",
        icon: <Book className="icon-size" />,
      },
    ],
  };
  // const role = localStorage.getItem("role");

  // const linksToDisplay = role ? navLinks[role] : navLinks[0];
  const linksToDisplay = navLinks["SUPER_ADMIN"];
  console.log(linksToDisplay);

  return (
    <div className="vh-100 d-md-flex w-100 ">
      <div className="dashboard-nav d-flex align-items-center justify-content-center d-md-block me-md-3 py-md-5 d-none d-md-block  position-relative">
        <div
          className="logo fs-4 w-100 text-center text-white cursor-pointer fw-semibold fs-4"
          onClick={() => navigate("/dashboard")}
        >
          Logo
        </div>
        <ul className="nav flex-column mb-auto w-100 ">
          {linksToDisplay.map((link, index) => (
            <li
              key={index}
              className="nav-item mb-2 d-flex align-items-center justify-content-center mt-3"
            >
              <Link
                to={link.path}
                className={`fs-6 d-flex align-items-center justify-content-start  text-decoration-none ${
                  location.pathname === link.path ? "text-yellow" : "text-white"
                }`}
              >
                <span
                  className={`${
                    location.pathname === link.path
                      ? "text-yellow"
                      : "text-lime"
                  }`}
                >
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}
          <div
            className="mx-3 mb-4"
            style={{ position: "absolute", bottom: 0 }}
          >
            <button
              className={"text-yellow btn text-center w-100 mt-5 "}
              onClick={handleLogout} // Close dropdown when clicked
            >
              <LogOut />
            </button>
          </div>
        </ul>
      </div>
      <div className="w-100 ">
        <div className="dashboard-nav p-3 d-flex align-items-center justify-content-between d-md-none d-block">
          <div className="fs-3 text-white">Logo</div>
          <div className="d-flex gap-4 align-items-center justify-content-between">
            <div className="">
              <Grid2x2Check
                className={`dashboard-links cursor-pointer ${
                  location.pathname === "/dashboard"
                    ? "active-link"
                    : "text-white"
                } `}
              />
            </div>
            <div className="" onClick={() => navigate("/dashboard/users")}>
              <User2
                className={`dashboard-links cursor-pointer ${
                  location.pathname === "/dashboard/users"
                    ? "active-link"
                    : "text-white"
                } `}
              />
            </div>
            <div className="">
              <BaggageClaim
                className={`dashboard-links cursor-pointer ${
                  location.pathname === "/dashboard/jobs"
                    ? "active-link"
                    : "text-white"
                } `}
              />
            </div>
            <div>
              <button
                className="btn btn-light w-100 text-start text-danger"
                onClick={handleLogout} // Close dropdown when clicked
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
