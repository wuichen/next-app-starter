import { getSession } from 'next-auth/client';
import Index from './index';

export default function SSR({ session }) {
  return <Index session={session} />;
}

export async function getServerSideProps(ctx) {
  return { props: { initialState: 1000, session: await getSession(ctx) } };
}
