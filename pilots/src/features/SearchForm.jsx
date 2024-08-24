/* eslint-disable react/prop-types */


import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    locationLat: Yup.number()
        .required('Latitude is required')
        .min(-90, 'Latitude must be between -90 and 90')
        .max(90, 'Latitude must be between -90 and 90'),
    locationLng: Yup.number()
        .required('Longitude is required')
        .min(-180, 'Longitude must be between -180 and 180')
        .max(180, 'Longitude must be between -180 and 180'),
    experience: Yup.number()
        .required('Experience is required')
        .min(0, 'Experience cannot be negative'),
    range: Yup.number()
        .required('Range is required')
        .min(0, 'Range cannot be negative')
});

const SearchForm = ({ location, onFetchPilots }) => (

    <Formik
        enableReinitialize
        initialValues={{
            locationLat: location.lat ?? "",
            locationLng: location?.lng ?? "",
            experience: 0,
            range: 10 // default range
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            onFetchPilots(values);
        }}
    >
        {({ dirty }) => (
            <Form key={dirty} className="bg-yellow-100 p-4 rounded-lg shadow-lg w-full md:w-1/3">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <label className="flex flex-col">
                        Latitude:
                        <Field
                            type="number"
                            name="locationLat"
                            className="mt-1 p-2 border border-gray-300 rounded"
                        />
                        <ErrorMessage name="locationLat" component="div" className="text-red-500 text-sm mt-1" />
                    </label>
                    <label className="flex flex-col">
                        Longitude:
                        <Field
                            type="number"
                            name="locationLng"
                            className="mt-1 p-2 border border-gray-300 rounded"
                        />
                        <ErrorMessage name="locationLng" component="div" className="text-red-500 text-sm mt-1" />
                    </label>
                    <label className="flex flex-col">
                        Experience (years):
                        <Field
                            type="number"
                            name="experience"
                            className="mt-1 p-2 border border-gray-300 rounded"
                        />
                        <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                    </label>
                    <label className="flex flex-col">
                        Range (km):
                        <Field
                            type="number"
                            name="range"
                            className="mt-1 p-2 border border-gray-300 rounded"
                        />
                        <ErrorMessage name="range" component="div" className="text-red-500 text-sm mt-1" />
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Search Pilots
                </button>
            </Form>
        )}
    </Formik>
);

SearchForm.displayName = 'SearchForm';

export default SearchForm;
