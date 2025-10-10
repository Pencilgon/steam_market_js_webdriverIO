export function PreciseTextLocator(text) {
    return `//*[text()='${text}']`
}

export function PartialTextLocator(partialText) {
    return `//*[contains(text(),'${partialText}')]`
}
