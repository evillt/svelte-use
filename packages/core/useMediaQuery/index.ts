import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import { ConfigurableWindow, defaultWindow } from '../_configurable'

/**
 * Reactive Media Query
 *
 * @param query
 * @param options
 */
export function useMediaQuery(query: string, options: ConfigurableWindow = {}) {
  const matches = writable(false)

  const { window = defaultWindow } = options
  if (!window) {
    matches.set(false)
    return matches
  }

  const mediaQuery = window.matchMedia(query)
  matches.set(mediaQuery.matches)

  const handler = (event: MediaQueryListEvent) => {
    matches.set(event.matches)
  }

  mediaQuery.addEventListener('change', handler)

  onDestroy(() => {
    mediaQuery.removeEventListener('change', handler)
  })

  return matches
}
