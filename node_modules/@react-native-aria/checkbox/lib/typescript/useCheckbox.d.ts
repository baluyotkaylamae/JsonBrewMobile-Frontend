import type { RefObject } from 'react';
import type { ToggleState } from '@react-stately/toggle';
import type { AccessibilityProps } from 'react-native';
import { AriaCheckboxProps } from '@react-types/checkbox';
export interface CheckboxAria extends AccessibilityProps {
    /** Props for the input or Pressable/Touchable element. */
    inputProps: any;
}
/**
 * Provides the behavior and accessibility implementation for a checkbox component.
 * Checkboxes allow users to select multiple items from a list of individual items, or
 * to mark one individual item as selected.
 * @param props - Props for the checkbox.
 * @param state - State for the checkbox, as returned by `useToggleState`.
 * @param inputRef - A ref for the HTML input element.
 */
export declare function useCheckbox(props: AriaCheckboxProps, state: ToggleState, inputRef: RefObject<HTMLInputElement>): CheckboxAria;
//# sourceMappingURL=useCheckbox.d.ts.map