import dynamic from "next/dynamic";


const FormLayoutWrapper = dynamic(() => import('./wrappers/form-layout.wrapper'), { ssr: false })
export default function Home() {
  return <>
    <FormLayoutWrapper />
  </>;
}
