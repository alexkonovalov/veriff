import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../Button/Button";
import { CheckToggle } from "../Check/CheckToggle";
import { fetchChecks, submitCheckResults } from "../../api";
import { ButtonStatusEnum, Check, FormStatusEnum } from "../../model";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";
import { Success } from "../Success/Success";
import { useKeydown } from "../../hooks/useKeydown";
import useRoveFocus from "../../hooks/useRoveFocus";
import useKeyPrompt from "../../hooks/useKeyPrompt";
import styles from "./Verification.module.scss";

export const Verification = () => {
    const [checks, setChecks] = useState<Check[]>([]);
    const [formStatus, setFormStatus] = useState<FormStatusEnum>(
        FormStatusEnum.Initial
    );

    const [checkedInfo, setCheckedInfo] = useState<{
        status: ButtonStatusEnum;
        checkedIx: number;
    }>({ status: ButtonStatusEnum.Empty, checkedIx: 0 });

    useEffect(() => {
        setFormStatus(FormStatusEnum.Loading);
        fetchChecks()
            .then((checks) => {
                setChecks(checks.sort((a, b) => a.priority - b.priority));
                setFormStatus(FormStatusEnum.Interactive);
            })
            .catch(() => {
                setFormStatus(FormStatusEnum.Error);
            });
    }, [fetchChecks, setChecks]);

    const { currentFocusIx } = useRoveFocus(
        checks.length,
        checkedInfo.status === ButtonStatusEnum.No
            ? checkedInfo.checkedIx
            : checkedInfo.checkedIx + 1
    );

    const onUncheckIx = useCallback(
        (ix: number) => {
            setCheckedInfo({
                status: ButtonStatusEnum.No,
                checkedIx: ix,
            });
        },
        [setCheckedInfo]
    );

    const onCheckIx = useCallback(
        (ix: number) => {
            setCheckedInfo({
                status: ButtonStatusEnum.Yes,
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
            setFormStatus(FormStatusEnum.Loading);

            submitCheckResults(
                checks[currentFocusIx].id,
                checkedInfo.status === ButtonStatusEnum.Yes
            )
                .then(() => {
                    setFormStatus(FormStatusEnum.Success);
                })
                .catch(() => {
                    setFormStatus(FormStatusEnum.Error);
                });
            e.preventDefault();
        },
        [submitCheckResults, setFormStatus, checks, currentFocusIx, checkedInfo]
    );

    useKeyPrompt({
        yesKey: "1",
        noKey: "2",
        updateCallback: onFocusCheck,
    });

    const isSubmitEnabled = useMemo(
        () =>
            checkedInfo.status === ButtonStatusEnum.No ||
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
        <div className={styles.Verification} data-testid="verification_form">
            {formStatus === FormStatusEnum.Interactive && (
                <form
                    onSubmit={onSubmit}
                    className={styles.Form}
                    data-testid="checks_form"
                >
                    {checks.length &&
                        checks.map((check, index) => (
                            <CheckToggle
                                key={index}
                                id={check.id}
                                ix={index}
                                tabIx={index}
                                status={
                                    checkedInfo.checkedIx === index
                                        ? checkedInfo.status
                                        : checkedInfo.checkedIx > index
                                        ? ButtonStatusEnum.Yes
                                        : ButtonStatusEnum.Empty
                                }
                                isFocused={currentFocusIx === index}
                                isDisabled={
                                    index >
                                    (checkedInfo.status === ButtonStatusEnum.Yes
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
                        data-testid="button_submit"
                    >
                        Submit
                    </Button>
                </form>
            )}
            {formStatus === FormStatusEnum.Success && <Success />}
            {formStatus === FormStatusEnum.Loading && <Loader />}
            {formStatus === FormStatusEnum.Error && <Error />}
        </div>
    );
};
