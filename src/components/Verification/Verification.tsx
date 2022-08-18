import Button from "../Button/Button";
import CheckToggle from "../Check/CheckToggle";
import { fetchChecks, submitCheckResults } from "../../api";
import { ButtonStatusEnum, Check, FormStatusEnum } from "../../model";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import useRoveFocus from "../../hooks/useRoveFocus";
import useKeyPrompt from "../../hooks/useKeyPrompt";
import styles from "./Verification.module.scss";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";
import { Success } from "../Success/Success";
import { useKeydown } from "../../hooks/useKeydown";

export const Verification = () => {
    const [checks, setChecks] = useState<Check[]>([]);
    const [formStatus, setFormStatus] = useState<FormStatusEnum>(
        FormStatusEnum.initial
    );

    const [checkedInfo, setCheckedInfo] = useState<{
        status: ButtonStatusEnum;
        checkedIx: number;
    }>({ status: ButtonStatusEnum.empty, checkedIx: 0 });

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

    const { currentFocusIx } = useRoveFocus(
        checks.length,
        checkedInfo.status === ButtonStatusEnum.no
            ? checkedInfo.checkedIx
            : checkedInfo.checkedIx + 1
    );

    const onUncheckIx = useCallback(
        (ix: number) => {
            setCheckedInfo({
                status: ButtonStatusEnum.no,
                checkedIx: ix,
            });
        },
        [setCheckedInfo]
    );

    const onCheckIx = useCallback(
        (ix: number) => {
            setCheckedInfo({
                status: ButtonStatusEnum.yes,
                checkedIx: ix,
            });
        },
        [setCheckedInfo]
    );

    const onFocusCheck = useCallback(
        (isCheck: boolean) =>
            (isCheck ? onCheckIx : onUncheckIx)(currentFocusIx),
        [currentFocusIx, onCheckIx, onUncheckIx]
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement> | KeyboardEvent) => {
            setFormStatus(FormStatusEnum.loading);
            submitCheckResults(
                `${currentFocusIx}`,
                checkedInfo.status === ButtonStatusEnum.yes
            )
                .then((result) => {
                    setFormStatus(FormStatusEnum.success);
                })
                .catch(() => {
                    setFormStatus(FormStatusEnum.error);
                });
            e.preventDefault();
        },
        [submitCheckResults, setFormStatus]
    );

    useKeyPrompt({
        yesKey: "1",
        noKey: "2",
        updateCallback: onFocusCheck,
    });

    const isSubmitEnabled = useMemo(
        () =>
            checkedInfo.status !== ButtonStatusEnum.yes ||
            checkedInfo.checkedIx === checks.length - 1,
        [checkedInfo.status, checkedInfo.checkedIx, checks.length]
    );

    const handleEnter = useCallback(
        (e: KeyboardEvent) =>
            e.key === "Enter" &&
            (isSubmitEnabled ? onSubmit(e) : e.preventDefault()),
        [isSubmitEnabled, onSubmit]
    );

    useKeydown(handleEnter);

    return (
        <div className={styles.Verification}>
            {/* <div>
                Focus:{currentFocusIx} | status: {checkedInfo.status} | checked{" "}
                {checks.length - 1}
                {checkedInfo.checkedIx}
            </div> */}
            {formStatus === FormStatusEnum.interactive && (
                <form onSubmit={onSubmit} className={styles.Form}>
                    {checks.length &&
                        checks.map((check, index) => (
                            <CheckToggle
                                key={index}
                                ix={index}
                                tabIx={index}
                                status={
                                    checkedInfo.checkedIx === index
                                        ? checkedInfo.status
                                        : checkedInfo.checkedIx > index
                                        ? ButtonStatusEnum.yes
                                        : ButtonStatusEnum.empty
                                }
                                isSelected={currentFocusIx === index}
                                isDisabled={
                                    index >
                                    (checkedInfo.status === ButtonStatusEnum.yes
                                        ? checkedInfo.checkedIx + 1
                                        : checkedInfo.checkedIx)
                                }
                                description={check.description}
                                onUncheckIx={onUncheckIx}
                                onCheckIx={onCheckIx}
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
