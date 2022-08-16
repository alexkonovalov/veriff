import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray,
    FieldProps,
} from "formik";
import Button from "../Button/Button";
import CheckToggle from "../Check/CheckToggle";
import { fetchChecks } from "../../api";
import { Check } from "../../model";
import { useEffect, useState } from "react";

const VerifyForm = () => {
    const [checks, setChecks] = useState<Check[]>([]);
    const [checkedInfo, setCheckedIx] = useState<{
        ix: number;
        isYes: boolean;
    }>({ isYes: false, ix: 0 });

    useEffect(() => {
        fetchChecks().then((checks) => {
            setChecks(checks);
        });
    }, []);

    return (
        <div>
            <h1>Checks</h1>
            <div>checkedInfo:{JSON.stringify(checkedInfo)}</div>
            {checks.length && (
                <Formik
                    initialValues={{ checks }}
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
                                name="checks"
                                render={(arrayHelpers) => (
                                    <div>
                                        {values.checks &&
                                        values.checks.length > 0 ? (
                                            values.checks.map(
                                                (check, index) => {
                                                    const onCheck = (
                                                        isYes: boolean
                                                    ) =>
                                                        setCheckedIx({
                                                            ix: index,
                                                            isYes,
                                                        });
                                                    const isDisabled =
                                                        index >
                                                        (checkedInfo.isYes
                                                            ? checkedInfo.ix + 1
                                                            : checkedInfo.ix);
                                                    const isYes =
                                                        checkedInfo.ix === index
                                                            ? checkedInfo.isYes
                                                            : checkedInfo.ix >
                                                              index
                                                            ? true
                                                            : false;

                                                    return (
                                                        <div key={index}>
                                                            <Field
                                                                name={`check_${index}`}
                                                            >
                                                                {({
                                                                    field, // { name, value, onChange, onBlur }
                                                                    form: {
                                                                        touched,
                                                                        errors,
                                                                    }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                    meta,
                                                                }: FieldProps<any>) => (
                                                                    <div>
                                                                        <CheckToggle
                                                                            onCheck={
                                                                                onCheck
                                                                            }
                                                                            isYes={
                                                                                isYes
                                                                            }
                                                                            isDisabled={
                                                                                isDisabled
                                                                            }
                                                                            description={
                                                                                check.description
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Field>
                                                        </div>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.push("")
                                                }
                                            >
                                                {/* show this when user has removed all friends from the list */}
                                                Add a friend
                                            </button>
                                        )}
                                        <div>
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            />
                        </Form>
                    )}
                />
            )}
        </div>
    );
};

export default VerifyForm;
