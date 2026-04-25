import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminCourses, deleteCourse } from "../../api/courseApi";
import { useAsync } from "../../hooks/useAsync";
import CourseCard from "../../components/ui/CourseCard";
import { SkeletonGrid } from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import Toast from "../../components/ui/Toast";

export default function AdminCourses() {
    const navigate = useNavigate();
    const { data, loading, error, refetch } = useAsync(
        () => getAdminCourses(),
        [],
    );
    const [toast, setToast] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const courses = data?.myCourses || [];

    async function handleDelete(course) {
        if (!window.confirm(`Delete "${course.title}"?`)) return;
        setDeleting(course._id);
        try {
            await deleteCourse(course._id);
            setToast({ type: "success", message: "Course deleted." });
            refetch();
        } catch (err) {
            setToast({ type: "error", message: err.message });
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 animate-fade-up">
                <div>
                    <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight mb-1">
                        My Courses
                    </h1>
                    {!loading && (
                        <p className="text-ink-muted text-sm">
                            {courses.length} course
                            {courses.length !== 1 ? "s" : ""} published
                        </p>
                    )}
                </div>
                <button
                    className="btn-primary"
                    onClick={() => navigate("/admin/courses/create")}
                >
                    + New Course
                </button>
            </div>

            {loading && <SkeletonGrid count={6} />}

            {error && (
                <div className="card text-center animate-fade-in space-y-3">
                    <p className="text-red-400 text-sm">
                        Failed to load — {error}
                    </p>
                    <button className="btn-outline text-sm" onClick={refetch}>
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && courses.length === 0 && (
                <EmptyState
                    icon="◆"
                    title="No courses yet"
                    subtitle="Create your first course to get started."
                    action={{
                        label: "+ Create Course",
                        onClick: () => navigate("/admin/courses/create"),
                    }}
                />
            )}

            {!loading && !error && courses.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course, i) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                            badge="Published"
                            badgeColor="gold"
                            index={i}
                            actions={[
                                {
                                    label: "Edit",
                                    variant: "outline",
                                    onClick: () =>
                                        navigate(
                                            `/admin/courses/edit/${course._id}`,
                                            { state: { course } },
                                        ),
                                },
                                {
                                    label:
                                        deleting === course._id
                                            ? "…"
                                            : "Delete",
                                    variant: "danger",
                                    onClick: handleDelete,
                                },
                            ]}
                        />
                    ))}
                </div>
            )}

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
