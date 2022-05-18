export interface SideNavProps {
    open: boolean
    onClose: () => void
    navigations: Array<{label: string, link?: string, options?: Array<{label: string, link: string}>}>
}