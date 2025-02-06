import classNames from "classnames";
import { useEffect, useState } from "preact/hooks";

interface Props {
  // the element we are wrapping
  children: React.ReactNode;
  // the tooltip content

  content: React.ReactNode;
  classNames?: string;
}

export function Tooltip({
  children,
  content,
  classNames: extraClasses,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [show, setShow] = useState(false);

  // add a delay to the tooltip

  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isHovered]);

  return (
    <div className={classNames("relative", extraClasses)}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      {show && (
        <div
          style={{ zIndex: 9999 }}
          className="fixed py-0.5 px-1 text-tiny text-white bg-black rounded shadow-lg z-50 ms-4"
        >
          {content}
        </div>
      )}
    </div>
  );
}
