export interface PersonalCode {
  /** day digits from code (XXXX00) */
  dayDigits: string;
  /** month digits from code (XX00XX) */
  monthDigits: string;
  /** year digits from code (00XXXX) */
  yearDigits: string;
  year: number;
  month: number;
  day: number;
}
