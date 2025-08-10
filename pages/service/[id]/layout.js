// app/service/[id]/layout.js
export const dynamic = 'force-static';

export default function ServiceLayout({ children }) {
    return <>{children}</>;
}