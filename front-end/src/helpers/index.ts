export function uniqueValues<T>(array: T[], keyAttribute: string) {
    const map: { [key: string]: T } = {};
    let item: T;
    for (let i = 0, length = array.length; i < length; i++) {
        item = array[i];
        if (!(item[keyAttribute] in map)) {
            map[item[keyAttribute]] = item;
        }
    }
    return Object.values(map);
}

export function filterArrayByKey<T>(list: T[], key: string, value: string) {
    return list.filter((item) => item[key] === value);
}

export function countMap<T>(array: T[] | undefined, keyAttribute: string): { [key: string]: number } {
    if (!array || array.length === 0) {
        return {};
    }
    const numbers: { [key: string]: number } = {};
    let item: T;
    for (let i = 0, length = array.length; i < length; i++) {
        item = array[i];

        if (item[keyAttribute] in numbers) {
            numbers[item[keyAttribute]] += 1;

        } else {
            numbers[item[keyAttribute]] = 1;
        }
    }

    return numbers;
}

export function formatEventType(eventType: string): string {
    if (!eventType || eventType.trim() === '') {
        return '';
    }
    return eventType.replace(/_/g, ' ');
}

export function formatEventNote(eventNote: string) {
    if (!eventNote || eventNote.trim() === '') {
        return '';
    }

    return eventNote.replace(/"/g, '');
}

export function sortHighlights(highlights: string[][] | undefined): string[][] {
    if (!highlights || highlights.length === 0) {
        return [];
    }
    return highlights.sort((a, b) => {
        const first = new Date(a[2]), second = new Date(b[2]);
        return first > second ? -1 : 1;
    });
}

const DateFormatter = Intl.DateTimeFormat('en-GB', {hour: 'numeric', minute: 'numeric', second: 'numeric'});

// tslint:disable-next-line:no-any
function isValidDate(d: Date) {
    return !isNaN(d.getTime());
}

export function isoDateToString(isoDate: string): string {
    // tslint:disable-next-line:no-console
    if (isoDate && isoDate.trim() !== '') {
        const d = new Date(isoDate);
        if (isValidDate(d)) {
            return DateFormatter.format(d);
        }
    }
    return isoDate;
}