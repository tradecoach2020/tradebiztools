import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const BusinessHealthScore = () => {
  return (
    <section id="health-score" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold flex items-center mb-6 text-white">
            <span className="text-primary mr-2">📊</span> Business Freedom Assessment
          </h2>
          <div className="text-center py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">
              The Business Freedom Assessment™
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              How close are you to owning a business — not a job?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Answer 20 quick questions about your trades business. Get your
              Business Freedom Score out of 100, your business stage, and the
              three things to fix first.
            </p>

            <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto mb-8 text-left text-gray-300">
              {[
                "Your score out of 100",
                "Your business stage and what's holding you back",
                "Three priorities to work on this month",
                "A personal video breakdown from Daren",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="shrink-0 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-semibold"
            >
              <a
                href="https://tradecoach.co.uk/assessment/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get My Score <ArrowUpRight size={18} className="ml-2" />
              </a>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Free. Takes about 4 minutes. No obligation.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default BusinessHealthScore;
