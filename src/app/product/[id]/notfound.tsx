import Link from "next/link";

export default function NotFoound() {
  return (
    <div>
      <h1>Herror in fetching the product</h1>
      <p>Sorry 😔</p>
      <Link href={"/test"}>
        <button>Go Back</button>
      </Link>
    </div>
  );
}
