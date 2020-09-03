// tslint:disable-next-line: no-any
export const get = async (url: string): Promise<{ data: any | null, error: any | null }> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return { data: null, error: { message: response.statusText, code: response.status } };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};