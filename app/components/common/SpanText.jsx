const SpanText = ({ text, className }) => {
  return (
  <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-primary to-[#2B6CB0]">
                {text}
                <span className="absolute  left-0 right-0 h-4 -bottom-1 rounded-full bg-primary/30"></span>
              </span>
              
        );
}

export default SpanText;