export default defineNuxtRouteMiddleware(async (to) => {
  // avoid non-embeddable paths within an iframe
  if (self !== top) {
    // allow for shared base
    if (to.path.startsWith('/base/')) {
      return
    }

    // allow for shared docs (public reader uses /doc/<uuid> without
    // shared-view layout meta — embed previews would otherwise be blocked).
    if (to.path.startsWith('/doc/')) {
      return
    }

    // allow for shared views based on page layout
    if (to.meta?.layout === 'shared-view') {
      return
    }

    // allow for shared views based on pageType meta prop
    if (to.meta?.pageType === 'shared-view') {
      return
    }

    // throw for all other pages
    throw createError({ statusCode: 403, message: 'Not allowed' })
  }
})
