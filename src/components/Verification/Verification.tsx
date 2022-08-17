import Button from "../Button/Button";
import CheckToggle from "../Check/CheckToggle";
import { fetchChecks, submitCheckResults } from "../../api";
import { Check, FormStatusEnum } from "../../model";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ToggleField } from "./ToggleField";
import useRoveFocus from "../../hooks/useRoveFocus";
import useKeyPrompt from "../../hooks/useKeyPrompt";
import { match } from "assert";

import styles from "./Verification.module.scss";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";
import { Success } from "../Success/Success";

export const Verification = () => {
    const [checks, setChecks] = useState<Check[]>([]);
    const [formStatus, setFormStatus] = useState<FormStatusEnum>(
        FormStatusEnum.initial
    );

    const [checkedInfo, setCheckedInfo] = useState<{
        isYes: boolean;
    }>({ isYes: false });

    useEffect(() => {
        setFormStatus(FormStatusEnum.loading);
        fetchChecks()
            .then((checks) => {
                setChecks(checks);
                setFormStatus(FormStatusEnum.interactive);
            })
            .catch(() => {
                setFormStatus(FormStatusEnum.error);
            });
    }, [fetchChecks, setChecks]);

    const setChecked = useCallback(
        (isCheck: boolean) => {
            setCheckedInfo({ isYes: isCheck });
        },
        [setCheckedInfo]
    );

    const uncheck = useCallback(() => {
        setCheckedInfo({ isYes: false });
    }, [setCheckedInfo]);

    const check = useCallback(() => {
        setCheckedInfo({ isYes: true });
    }, [setCheckedInfo]);

    const { currentFocus, setCurrentFocus } = useRoveFocus(
        checks.length,
        !checkedInfo.isYes,
        uncheck,
        check
    );

    const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
        console.log("submit");
        setFormStatus(FormStatusEnum.loading);
        submitCheckResults(`${currentFocus}`, checkedInfo.isYes)
            .then((result) => {
                console.log("result", result);
                setFormStatus(FormStatusEnum.success);
            })
            .catch(() => {
                setFormStatus(FormStatusEnum.error);
            });
        e.preventDefault();
    }, []);

    useKeyPrompt({ yesKey: "1", noKey: "2", updateCallback: setChecked });

    const isSubmitEnabled = useMemo(
        () => !checkedInfo.isYes || currentFocus === checks.length - 1,
        [checkedInfo.isYes, currentFocus, checks.length]
    );

    const selectCheck = useCallback(
        (value: { ix: number; isYes: boolean }) => {
            setCurrentFocus(value.ix);
            setCheckedInfo(value);
        },
        [setCheckedInfo, setCurrentFocus]
    );

    return (
        <div className={styles.Verification}>
            {/* <h1 id="lada">Checks : submit {submitStatus} </h1>
            <div>
                Focus:{currentFocus} :: {checkedInfo.isYes ? "y" : "n"}
            </div> */}
            {formStatus === FormStatusEnum.interactive && (
                <form onSubmit={submit} className={styles.Form}>
                    {checks.length &&
                        checks.map((check, index) => (
                            <ToggleField
                                key={index}
                                focusedIx={currentFocus}
                                index={index}
                                check={check}
                                setCheckedIx={selectCheck}
                                isCheckedYes={checkedInfo.isYes}
                                checkedIx={currentFocus}
                            />
                        ))}

                    <Button
                        className={styles.SubmitButton}
                        type="submit"
                        disabled={!isSubmitEnabled}
                    >
                        Submit
                    </Button>
                </form>
            )}
            {formStatus === FormStatusEnum.success && <Success />}
            {formStatus === FormStatusEnum.loading && <Loader />}
            {formStatus === FormStatusEnum.error && <Error />}
        </div>
    );
};
