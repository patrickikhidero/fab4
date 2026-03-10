import React from "react";

interface Comment {
  id: string;
  name: string;
  timestamp: string;
  message: string;
  avatar: string;
}

interface ApplicationStatusSectionProps {
  comments?: Comment[];
}

export function ApplicationStatusSection({
  comments = [],
}: ApplicationStatusSectionProps) {
  const defaultComments: Comment[] = [
    {
      id: "1",
      name: "Katherine Moss",
      timestamp: "Thursday 11:40am",
      message:
        "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
      avatar: "/images/avatars/default-avatar.png",
    },
  ];

  const displayComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div
      className="size-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-white px-0 py-4 sm:py-5 shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)]"
      data-name="Main"
      data-node-id="474:5262"
    >
      {/* Top Language Selector */}
      <div
        className="flex w-full items-end justify-end px-4 sm:px-5"
        data-node-id="474:5263"
      >
        <div
          className="flex items-center justify-center gap-2 rounded-[999px] px-2 py-0"
          data-node-id="474:5264"
        >
          <div
            className="relative h-4 w-4 overflow-hidden shrink-0"
            data-name="Frame"
            data-node-id="474:5265"
          >
            <div className="absolute inset-0" data-name="Vector" data-node-id="474:5266">
              <img
                alt="Globe Icon"
                className="block size-full max-w-none"
                src="/svg/ui/globe.svg"
              />
            </div>
            <div
              className="absolute left-0.5 top-0.5 h-[11.5px] w-[13px]"
              data-name="Language"
              data-node-id="474:5267"
            >
              <div
                className="absolute bottom-0 left-[46.15%] right-0 top-[39.13%]"
                data-name="Vector"
                id="node-I474_5267-435_2751"
              >
                <div
                  className="absolute inset-[-7.14%]"
                  style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}
                >
                  <img
                    alt="Language Icon"
                    className="block size-full max-w-none"
                    src="/svg/ui/language.svg"
                  />
                </div>
              </div>
              <div
                className="absolute inset-[82.61%_7.69%_17.39%_53.85%]"
                data-name="Vector"
                id="node-I474_5267-435_2752"
              >
                <div
                  className="absolute inset-[-0.5px_-10%]"
                  style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}
                >
                  <img
                    alt="Language Icon 2"
                    className="block size-full max-w-none"
                    src="/svg/ui/language1.svg"
                  />
                </div>
              </div>
              <div
                className="absolute bottom-[86.96%] left-[30.77%] right-[69.23%] top-0"
                data-name="Vector"
                id="node-I474_5267-435_2753"
              >
                <div
                  className="absolute inset-[-33.33%_-0.5px]"
                  style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}
                >
                  <img
                    alt="Language Icon 3"
                    className="block size-full max-w-none"
                    src="/svg/ui/language2.svg"
                  />
                </div>
              </div>
              <div
                className="absolute bottom-[86.96%] left-0 right-[38.46%] top-[13.04%]"
                data-name="Vector"
                id="node-I474_5267-435_2754"
              >
                <div
                  className="absolute inset-[-0.5px_-6.25%]"
                  style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}
                >
                  <img
                    alt="Language Icon 4"
                    className="block size-full max-w-none"
                    src="/svg/ui/language3.svg"
                  />
                </div>
              </div>
              <div
                className="absolute bottom-[34.78%] left-0 right-[53.85%] top-[13.04%]"
                data-name="Vector"
                id="node-I474_5267-435_2755"
              >
                <div
                  className="absolute inset-[-8.333%]"
                  style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}
                >
                  <img
                    alt="Language Icon 5"
                    className="block size-full max-w-none"
                    src="/svg/ui/language4.svg"
                  />
                </div>
              </div>
              <div
                className="absolute inset-[30.43%_38.46%_34.78%_18.02%]"
                data-name="Vector"
                id="node-I474_5267-435_2756"
              >
                <div
                  className="absolute inset-[-12.5%_-8.84%]"
                  style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}
                >
                  <img
                    alt="Language Icon 6"
                    className="block size-full max-w-none"
                    src="/svg/ui/language5.svg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative shrink-0 font-['Neue_Montreal:Regular',_sans-serif] text-[13px] leading-[20px] text-[#272635] sm:text-[14px]"
            data-node-id="474:5268"
          >
            <p className="whitespace-pre">English</p>
          </div>

          <div
            className="relative h-4 w-4 overflow-hidden shrink-0"
            data-name="Filled Caret Down"
            data-node-id="474:5269"
          >
            <div className="absolute inset-0" data-name="Vector" id="node-I474_5269-284_1327">
              <img
                alt="Dropdown Arrow"
                className="block size-full max-w-none"
                src="/svg/ui/language6.svg"
              />
            </div>
            <div
              className="absolute inset-[34.38%_15.63%_28.12%_15.62%]"
              data-name="Vector"
              id="node-I474_5269-284_1328"
            >
              <img
                alt="Caret Down"
                className="block size-full max-w-none"
                src="/svg/icons/dropdown-arrow.svg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex w-full flex-col gap-5 px-4 pt-4 sm:px-6 lg:px-10 xl:px-[120px] 2xl:px-[220px]"
        data-node-id="474:5270"
      >
        {/* Application Title and Badge */}
        <div
          className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-5"
          data-node-id="474:5505"
        >
          <div
            className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2 font-['Neue_Montreal:Regular',_sans-serif] not-italic"
            data-node-id="474:5491"
          >
            <div
              className="relative shrink-0 text-[22px] text-[#272635] sm:text-[24px]"
              data-node-id="474:5492"
            >
              <p className="leading-[normal] whitespace-pre">Your Application</p>
            </div>
            <div
              className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] sm:text-[16px]"
              data-node-id="474:5493"
            >
              <p className="leading-[22px] sm:leading-[24px]">
                Clearly provide details to help us understand and process your
                fund request.
              </p>
            </div>
          </div>

          <div
            className="flex w-fit shrink-0 flex-col items-center justify-center rounded-[12px] bg-[#fbfbe9] px-2 py-1"
            data-name="Badge"
            data-node-id="476:5636"
          >
            <div
              className="flex items-center justify-center gap-1"
              data-name="Container"
              id="node-I476_5636-1913_29448"
            >
              <div
                className="relative shrink-0 font-['Neue_Montreal:Regular',_sans-serif] text-center text-[12px] tracking-[-0.06px] text-[#272635]"
                id="node-I476_5636-1913_29451"
              >
                <p className="leading-[1.45] whitespace-pre">Under review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="relative h-0 w-full" data-node-id="474:5274">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <img
              alt="Divider Line"
              className="block size-full max-w-none"
              src="/svg/decoration/divider-line1.svg"
            />
          </div>
        </div>

        {/* Status Cards Container */}
        <div
          className="flex w-full flex-col gap-5"
          data-node-id="475:5524"
        >
          {/* Applicant Identification Card */}
          <div
            className="flex w-full flex-col gap-5 rounded-[12px] bg-[#f9faf7] p-4 sm:p-5"
            data-node-id="476:5654"
          >
            <div
              className="flex w-full items-start justify-start gap-2"
              data-node-id="475:5610"
            >
              <div
                className="flex min-w-0 flex-1 flex-col gap-2 font-['Neue_Montreal:Regular',_sans-serif] not-italic"
                data-node-id="476:5623"
              >
                <div
                  className="relative w-full shrink-0 text-[18px] text-[#272635] sm:text-[20px]"
                  data-node-id="475:5611"
                >
                  <p className="leading-[26px] sm:leading-[28px]">
                    Applicant Identification
                  </p>
                </div>
                <div
                  className="relative w-full shrink-0 text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]"
                  data-node-id="475:5612"
                >
                  <p className="leading-[19px] sm:leading-[20px]">
                    This helps us learn more about you if eligible for our
                    program
                  </p>
                </div>
              </div>
              <div
                className="flex shrink-0 flex-col items-center justify-center"
                data-name="Connector wrap"
                data-node-id="476:5614"
              >
                <div
                  className="relative h-6 w-6 shrink-0"
                  data-name="clock_loader_40"
                  data-node-id="476:5615"
                >
                  <img
                    alt="Clock Loader"
                    className="block size-full max-w-none"
                    src="/svg/icons/clock-loader.svg"
                  />
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div
              className="flex w-full flex-col gap-2"
              data-node-id="476:5657"
            >
              <div
                className="relative w-full shrink-0 font-['Neue_Montreal:Regular',_sans-serif] text-[12px] uppercase text-[#272635] sm:text-[14px]"
                data-node-id="476:5655"
              >
                <p className="leading-[normal]">Comments</p>
              </div>

              <div
                className="flex w-full items-start justify-start"
                data-name="Row"
                data-node-id="476:5643"
              >
                {displayComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex w-full max-w-[560px] items-start justify-start gap-3"
                    data-name="Message"
                    data-node-id="476:5644"
                  >
                    <div
                      className="relative h-[25.6px] w-[25.6px] shrink-0 rounded-[8420.21px] bg-[#c0c6dd] bg-cover bg-center"
                      data-name="Avatar"
                      data-node-id="476:5645"
                      style={{ backgroundImage: `url('${comment.avatar}')` }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[8420.21px] border-0 border-[rgba(39,38,53,0.05)] shadow-[0px_0.8px_3.2px_0px_rgba(12,12,13,0.05)]"
                      />
                    </div>

                    <div
                      className="flex min-w-0 flex-1 flex-col gap-1.5"
                      data-name="Content"
                      data-node-id="476:5646"
                    >
                      <div
                        className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-start sm:gap-2 font-['Neue_Montreal:Regular',_sans-serif] not-italic"
                        data-name="Name and time"
                        data-node-id="476:5647"
                      >
                        <div
                          className="min-w-0 flex-1 overflow-hidden text-[14px] text-[#272635]"
                          data-node-id="476:5648"
                        >
                          <p className="overflow-hidden text-ellipsis leading-[20px]">
                            {comment.name}
                          </p>
                        </div>
                        <div
                          className="shrink-0 text-[11px] text-[rgba(39,38,53,0.5)] sm:text-[12px]"
                          data-node-id="474:5649"
                        >
                          <p className="whitespace-pre leading-[18px]">
                            {comment.timestamp}
                          </p>
                        </div>
                      </div>

                      <div
                        className="relative w-full rounded-bl-[8px] rounded-br-[8px] rounded-tr-[8px] bg-white"
                        data-name="Input"
                        data-node-id="476:5650"
                      >
                        <div className="flex w-full items-center justify-start gap-2 overflow-hidden px-3.5 py-2.5">
                          <div
                            className="min-w-0 flex-1 font-['Neue_Montreal:Regular',_sans-serif] text-[14px] text-[#272635] sm:text-[16px]"
                            data-node-id="476:5651"
                          >
                            <p className="break-words leading-[22px] sm:leading-[24px]">
                              {comment.message}
                            </p>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-bl-[8px] rounded-br-[8px] rounded-tr-[8px] border border-[rgba(39,38,53,0.1)]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Admission Confirmation Card */}
          <div
            className="flex w-full flex-col gap-5 rounded-[12px] bg-[#f9faf7] p-4 sm:p-5"
            data-node-id="476:5658"
          >
            <div
              className="flex w-full items-start justify-start gap-2"
              data-node-id="476:5659"
            >
              <div
                className="flex min-w-0 flex-1 flex-col gap-2 font-['Neue_Montreal:Regular',_sans-serif] not-italic text-[rgba(39,38,53,0.5)]"
                data-node-id="476:5660"
              >
                <div
                  className="relative w-full shrink-0 text-[18px] sm:text-[20px]"
                  data-node-id="476:5661"
                >
                  <p className="leading-[26px] sm:leading-[28px]">
                    Admission Confirmation
                  </p>
                </div>
                <div
                  className="relative w-full shrink-0 text-[13px] sm:text-[14px]"
                  data-node-id="476:5662"
                >
                  <p className="leading-[19px] sm:leading-[20px]">
                    We verify all the information and documents you provided to
                    be sure you&apos;re a perfect gentleman
                  </p>
                </div>
              </div>
              <div
                className="flex shrink-0 flex-col items-center justify-center"
                data-name="Connector wrap"
                data-node-id="476:5679"
              >
                <div
                  className="relative h-6 w-6 shrink-0"
                  data-name="donut_large"
                  data-node-id="476:5680"
                >
                  <img
                    alt="Donut Large"
                    className="block size-full max-w-none"
                    src="/svg/icons/donut-large.svg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Review Guarantors Card */}
          <div
            className="flex w-full flex-col gap-5 rounded-[12px] bg-[#f9faf7] p-4 sm:p-5"
            data-node-id="476:5684"
          >
            <div
              className="flex w-full items-start justify-start gap-2"
              data-node-id="476:5685"
            >
              <div
                className="flex min-w-0 flex-1 flex-col gap-2 font-['Neue_Montreal:Regular',_sans-serif] not-italic text-[rgba(39,38,53,0.5)]"
                data-node-id="476:5686"
              >
                <div
                  className="relative w-full shrink-0 text-[18px] sm:text-[20px]"
                  data-node-id="476:5687"
                >
                  <p className="leading-[26px] sm:leading-[28px]">
                    Review Guarantors
                  </p>
                </div>
                <div
                  className="relative w-full shrink-0 text-[13px] sm:text-[14px]"
                  data-node-id="476:5688"
                >
                  <p className="leading-[19px] sm:leading-[20px]">
                    We want to be sure your guarantors trust you as much as we
                    trust you
                  </p>
                </div>
              </div>
              <div
                className="flex shrink-0 flex-col items-center justify-center"
                data-name="Connector wrap"
                data-node-id="476:5689"
              >
                <div
                  className="relative h-6 w-6 shrink-0"
                  data-name="donut_large"
                  data-node-id="476:5690"
                >
                  <img
                    alt="Donut Large"
                    className="block size-full max-w-none"
                    src="/svg/icons/donut-large.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex w-full flex-1 items-end justify-end px-4 pt-8 sm:px-5"
        data-node-id="474:5429"
      >
        <div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-['Neue_Montreal:Regular',_sans-serif] text-[12px] text-[rgba(39,38,53,0.5)] sm:justify-end sm:gap-5 sm:text-[14px]"
          data-node-id="474:5430"
        >
          <div className="relative shrink-0" data-node-id="474:5431">
            <p className="whitespace-pre leading-[normal]">Terms</p>
          </div>
          <div className="relative shrink-0" data-node-id="474:5432">
            <p className="whitespace-pre leading-[normal]">Legal</p>
          </div>
          <div className="relative shrink-0" data-node-id="474:5433">
            <p className="whitespace-pre leading-[normal]">Privacy policy</p>
          </div>
          <div className="relative shrink-0" data-node-id="474:5434">
            <p className="whitespace-pre leading-[normal]">Cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}