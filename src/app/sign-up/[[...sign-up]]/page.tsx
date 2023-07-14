import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className='py-24'>
      <div className='container'>
        <div className='flex justify-center'>
          <SignUp />
        </div>
      </div>
    </section>
  );
}