import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Child from "./Child";
function App() {
  const initialValues = {
    name: "",
    age: "",
  };

  const [initVal, setInitVal] = useState(initialValues);
  const validationSchema = Yup.object({
    name: Yup.string().label("Full Name").min(5, "Min 5 charactors").required(),
  });
  const [age, setAge] = useState(initialValues.age);

  const onChildChange = (field, value, isValid) => {
    console.log(`child isValid ${isValid}`);
    setAge(value);
  };

  return (
    <Formik
      initialValues={initVal}
      validateOnChange={true}
      validateOnMount={true}
      validateOnBlur={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { setFieldTouched, setSubmitting }) => {
        console.log("submitted values: ", { ...values, age: age });
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
        <div className="bg-blue-300 min-w-screen min-h-screen overflow-x-hidden">
          <Form className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3">
            <h1 className="text-3xl mb-3 text-center">Register</h1>
            <div className="mb-4">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className={`block w-full rounded border py-1 px-2 'border-red-400' : 'border-gray-300'}`}
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name && (
                <span className="text-red-400">{errors.name}</span>
              )}
            </div>

            <Child values={values} onChange={onChildChange} />

            <div className="text-center">
              <button
                className="bg-blue-500 rounded p-3 text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default App;
