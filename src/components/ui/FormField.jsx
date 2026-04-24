/**
 * <FormField label="Email" error="Required">
 *   <input ... />
 * </FormField>
 */
export default function FormField({ label, error, children }) {
  return (
    <div className="mb-4">
      {label && <label className="form-label">{label}</label>}
      {children}
      {error && (
        <p className="mt-1 text-[12px] text-red-400">{error}</p>
      )}
    </div>
  )
}
