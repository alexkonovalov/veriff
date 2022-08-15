import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import Button from "../Button/Button";

const VerifyForm = () => (
    <div>
        <h1>Friend List</h1>
        <Formik
            initialValues={{ friends: ["jared", "ian", "brent"] }}
            onSubmit={(values) => {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        alert(JSON.stringify(values, null, 2));
                        resolve("");
                    }, 800);
                });
            }}
            render={({ values }) => (
                <Form>
                    <FieldArray
                        name="friends"
                        render={(arrayHelpers) => (
                            <div>
                                {values.friends && values.friends.length > 0 ? (
                                    values.friends.map((friend, index) => (
                                        <div key={index}>
                                            <Field name={`friends.${index}`} />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.remove(index)
                                                } // remove a friend from the list
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.insert(
                                                        index,
                                                        ""
                                                    )
                                                } // insert an empty string at a position
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                    >
                                        {/* show this when user has removed all friends from the list */}
                                        Add a friend
                                    </button>
                                )}
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        )}
                    />
                </Form>
            )}
        />
    </div>
);

export default VerifyForm;
