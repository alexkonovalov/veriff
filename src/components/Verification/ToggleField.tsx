import { Check } from "../../model";
import CheckToggle from "../Check/CheckToggle";

export type ToggleFieldProps = {
    index: number;
    check: Check;
    checkedIx: number;
    focusedIx: number;
    isCheckedYes: boolean;
    setCheckedIx: ({ ix, isYes }: { ix: number; isYes: boolean }) => void;
};

export const ToggleField = ({
    index,
    check,
    setCheckedIx,
    focusedIx,
    isCheckedYes,
    checkedIx,
}: ToggleFieldProps) => {
    const onCheck = (isYes: boolean) =>
        setCheckedIx({
            ix: index,
            isYes: isYes,
        });
    const isDisabled = index > (isCheckedYes ? checkedIx + 1 : checkedIx);

    const isSelected = focusedIx === index;

    const isYes =
        checkedIx === index ? isCheckedYes : checkedIx > index ? true : false;

    return (
        <CheckToggle
            onCheck={onCheck}
            isSelected={isSelected}
            isYes={isYes}
            tabIx={index}
            isDisabled={isDisabled}
            description={check.description}
        />
    );
};
