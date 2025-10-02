import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchGlobal() {
	const url = `${getStrapiURL()}/global?populate=*`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error('Failed to fetch global data');
	}
	return res.json();
}
