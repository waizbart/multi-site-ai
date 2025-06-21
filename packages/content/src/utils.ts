import slugify from 'slugify'

/**
 * Garante que o slug gerado seja único dentro de uma lista.
 * Se já existir, adiciona sufixo -1, -2, ...
 */
export function safeSlug(title: string, existing: string[]): string {
  const base = slugify(title, { lower: true, strict: true })
  let slug = base
  let i = 1
  while (existing.includes(slug)) {
    slug = `${base}-${i++}`
  }
  return slug
}

/** Dorme N ms */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Tenta executar promiseFn até maxRetries, com backoff exponencial (base 2).
 */
export async function withRetry<T>(
  promiseFn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 500
): Promise<T> {
  let attempt = 0
  let delay = initialDelay
  while (true) {
    try {
      return await promiseFn()
    } catch (err) {
      if (attempt >= maxRetries) throw err
      await sleep(delay)
      delay *= 2
      attempt++
    }
  }
}