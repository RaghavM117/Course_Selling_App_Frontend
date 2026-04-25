import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { createCourse, editCourse } from "../../api/courseApi";
import FormField from "../../components/ui/FormField";
import { ButtonSpinner } from "../../components/ui/Spinner";
import Toast from "../../components/ui/Toast";

export default function CourseForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    // When editing, navigate passes course via location.state
    const existing = location.state?.course;
    const isEdit = !!existing;

    const [form, setForm] = useState({
        title: existing?.title || "",
        description: existing?.description || "",
        price: existing?.price || "",
        image: existing?.image || "",
        category: existing?.category || "",
        level: existing?.level || "",
        language: existing?.language || "",
        duration: existing?.duration || "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const update = (k) => (e) => {
        setForm((f) => ({ ...f, [k]: e.target.value }));
        setErrors((er) => ({ ...er, [k]: "" }));
    };

    function validate() {
        const e = {};
        if (!form.title.trim()) e.title = "Required";
        if (!form.description.trim()) e.description = "Required";
        if (!form.category.trim()) e.category = "Required";
        if (!form.level) e.level = "Required";
        if (!form.language.trim()) e.language = "Required";
        if (!form.duration.trim()) e.duration = "Required";
        if (!form.image.trim()) e.image = "Required";
        if (!form.price) e.price = "Required";
        if (isNaN(Number(form.price)) || Number(form.price) < 0)
            e.price = "Enter a valid price";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const payload = {
                ...form,
                price: Number(form.price),
                image: form.image,
            };
            isEdit
                ? await editCourse(id, payload)
                : await createCourse(payload);

            setToast({
                type: "success",
                message: isEdit ? "Course updated!" : "Course created!",
            });

            // Navigate back after short delay so toast is visible
            setTimeout(() => navigate("/admin/courses"), 1200);
        } catch (err) {
            setToast({ type: "error", message: err.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto px-6 py-10">
            {/* Header */}
            <div className="mb-8 animate-fade-up">
                <button
                    onClick={() => navigate("/admin/courses")}
                    className="text-ink-muted text-[13px] hover:text-ink-secondary
                     transition-colors flex items-center gap-1.5 mb-5"
                >
                    ← Back to Courses
                </button>
                <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight">
                    {isEdit ? "Edit Course" : "Create Course"}
                </h1>
                <p className="text-ink-muted text-sm mt-1">
                    {isEdit
                        ? "Update the details below."
                        : "Fill in the details to publish a new course."}
                </p>
            </div>

            {/* Form card */}
            <div
                className="card animate-fade-up"
                style={{ animationDelay: "60ms" }}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <FormField label="Course Title" error={errors.title}>
                        <input
                            className="input-field"
                            value={form.title}
                            onChange={update("title")}
                            placeholder="e.g. Complete React Bootcamp"
                        />
                    </FormField>

                    <FormField label="Description" error={errors.description}>
                        <textarea
                            className="input-field resize-none"
                            rows={4}
                            value={form.description}
                            onChange={update("description")}
                            placeholder="What will students learn? (min 10 characters)"
                        />
                    </FormField>

                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Category" error={errors.category}>
                            <input
                                className="input-field"
                                value={form.category}
                                onChange={update("category")}
                                placeholder="e.g. Programming"
                            />
                        </FormField>

                        <FormField label="Level" error={errors.level}>
                            <select
                                className="input-field bg-bg-surface"
                                value={form.level}
                                onChange={update("level")}
                            >
                                <option value="">Select level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">
                                    Intermediate
                                </option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Language" error={errors.language}>
                            <input
                                className="input-field"
                                value={form.language}
                                onChange={update("language")}
                                placeholder="e.g. English"
                            />
                        </FormField>

                        <FormField label="Duration" error={errors.duration}>
                            <input
                                className="input-field"
                                value={form.duration}
                                onChange={update("duration")}
                                placeholder="e.g. 10 hours"
                            />
                        </FormField>
                    </div>

                    <FormField label="Price (₹)" error={errors.price}>
                        <input
                            className="input-field"
                            type="number"
                            min="0"
                            value={form.price}
                            onChange={update("price")}
                            placeholder="e.g. 999"
                        />
                    </FormField>

                    <FormField label="Cover Image URL" error={errors.image}>
                        <input
                            className="input-field"
                            value={form.image}
                            onChange={update("image")}
                            placeholder="https://..."
                        />
                    </FormField>

                    {form.image && (
                        <div className="mb-4 rounded-lg overflow-hidden border border-bg-border h-36">
                            <img
                                src={form.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                        </div>
                    )}

                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            className="btn-outline flex-1 py-2.5"
                            onClick={() => navigate("/admin/courses")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading && <ButtonSpinner />}
                            {isEdit ? "Save Changes" : "Publish Course"}
                        </button>
                    </div>
                </form>
            </div>

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
