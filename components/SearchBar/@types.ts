export interface SearchBarProps {
  journals?: Array<{ id: string; name: string }>
  variant?: 'contained' | 'outlined'
  depressSearchBtn?: boolean
}
