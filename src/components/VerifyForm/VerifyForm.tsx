import Button from "../Button/Button";
import CheckToggle from "../Check/CheckToggle";
import { fetchChecks, submitCheckResults } from "../../api";
import { Check } from "../../model";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToggleField } from "./ToggleField";
import useRoveFocus from "../../hooks/useRoveFocus";
import useKeyPrompt from "../../hooks/useKeyPrompt";

const VerifyForm = () => {
    const [checks, setChecks] = useState<Check[]>([]);
    const [checkedInfo, setCheckedInfo] = useState<{
        isYes: boolean;
    }>({ isYes: false });

    useEffect(() => {
        fetchChecks().then((checks) => {
            setChecks(checks);
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
        <div>
            <h1 id="lada">Checks</h1>
            <div>
                Focus:{currentFocus} :: {checkedInfo.isYes ? "y" : "n"}
            </div>
            <div>
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
                <div>
                    <Button type="submit" disabled={!isSubmitEnabled}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VerifyForm;
