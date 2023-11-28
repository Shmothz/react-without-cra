export const SectionService = {
    _section: 1,
    getSection() {
        return this._section
    },
    setSection(value: number) {
        return (this._section = value)
    },
    resetSection() {
        return (this._section = 1)
    },
}
