/**
 * 입력값 유효성 검사 유틸리티
 */

import { MIN_PASSWORD_LENGTH, DEFAULT_ADMIN_ID, DEFAULT_ADMIN_PASSWORD } from './constants'

export interface ValidationError {
  field: string
  message: string
}

/**
 * 아이디 검증
 */
export const validateId = (id: string): string | null => {
  if (!id.trim()) {
    return '필수 입력항목입니다'
  }
  return null
}

/**
 * 비밀번호 검증
 */
export const validatePassword = (password: string): string | null => {
  if (!password.trim()) {
    return '필수 입력항목입니다'
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다`
  }
  return null
}

/**
 * 로그인 폼 전체 검증
 */
export const validateLoginForm = (
  id: string,
  password: string
): Record<string, string> => {
  const errors: Record<string, string> = {}

  const idError = validateId(id)
  if (idError) {
    errors.id = idError
  }

  const passwordError = validatePassword(password)
  if (passwordError) {
    errors.password = passwordError
  }

  return errors
}

/**
 * 로그인 자격증명 검증 (고정 계정)
 */
export const validateCredentials = (id: string, password: string): boolean => {
  // 초기 단계: 고정 계정만 지원
  // TODO: 추후 백엔드 API 인증으로 변경
  return id === DEFAULT_ADMIN_ID && password === DEFAULT_ADMIN_PASSWORD
}
