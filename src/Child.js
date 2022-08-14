import { Formik, Form } from "formik";
import * as Yup from "yup";

function Child({ values, onChange }) {
  const validationSchema = Yup.object({
    age: Yup.number()
      .min(15, "You need to be older than 15 to register")
      .max(20, "You need to be less than 20 to register")
      .required(),
  });

  return (
    <Formik
      initialValues={values}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={validationSchema}
      validateOnMount={true}
      isInitialValid={() => validationSchema.isValidSync(values)}
      onSubmit={async (values, { setFieldTouched, setSubmitting }) => {
        console.log("submitted values: ", values);
      }}
    >
      {({
        values,
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        touched,
        handleChange,
        handleBlur,
        errors,
        isSubmitting,
      }) => (
        <div className="mb-4">
          <label>Age</label>
          <input
            type="number"
            name="age"
            id="age"
            className={`block w-full rounded border py-1 px-2 ${
              touched.age && errors.age ? "border-red-400" : "border-gray-300"
            }`}
            onChange={(e) => {
              setFieldValue("age", e.target.value);
              onChange("age", e.target.value);
              console.log({ ...values, age: e.target.value });
              let isValid = validationSchema.isValidSync({
                ...values,
                age: e.target.value,
              });
              onChange("age", e.target.value, isValid);
            }}
            onBlur={handleBlur}
            value={values.age}
          />
          {touched.age && errors.age && (
            <span className="text-red-400">{errors.age}</span>
          )}
        </div>
      )}
    </Formik>
  );
}

export default Child;
