export interface NavBarProps {
    navigations: Array<{label: string, link?: string, options?: Array<{label: string, link: string}>}>
}